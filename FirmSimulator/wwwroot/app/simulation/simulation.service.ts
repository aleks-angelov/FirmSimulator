import { Injectable } from "@angular/core";

import { Cost, Revenue } from "./simulation-models";
import { Score } from "../scores/score";
import { Settings } from "../settings/settings";

import { ScoresService } from "../scores/scores.service";

@Injectable()
export class SimulationService {
    finalScore: Score;
    simulationRunning = false;

    revenueModel: Revenue;
    costModel: Cost;

    currentTurn: number;
    totalProfit: number;
    private maximumQuarterlyProfit: number;
    private maximumTotalProfit: number;
    profitMaximization: number;

    private researchEffectRoll: number;

    quarterlyQuantity: number;
    quarterlyResearch: number;
    quarterlyRevenue: number;
    quarterlyCost: number;
    quarterlyProfit: number;

    constructor(
        private scoreService: ScoresService) {
    }

    beginSimulation(initialSettings: Settings): void {
        this.finalScore = new Score();
        this.finalScore.startTime = new Date();
        this.finalScore.settingsDescription = initialSettings.description;
        this.finalScore.userEmail = initialSettings.userEmail;

        this.revenueModel = new Revenue(initialSettings.revenue_a, initialSettings.revenue_b);
        this.costModel = new Cost(initialSettings.cost_a, initialSettings.cost_b, initialSettings.cost_c);

        this.currentTurn = 1;
        this.totalProfit = 100.0;
        this.maximumTotalProfit = 100.0;
        this.profitMaximization = 1;

        this.simulationRunning = true;
    }

    calculateQuarterlyValues(): void {
        this.quarterlyRevenue = this.revenueModel.calculateTotalRevenue(this.quarterlyQuantity);
        this.quarterlyCost = this.costModel.calculateTotalCost(this.quarterlyQuantity);
        this.quarterlyProfit = this.quarterlyRevenue - this.quarterlyCost - this.quarterlyResearch;

        this.totalProfit += this.quarterlyProfit;
    }

    calculateProfitMaximization(maxQ: number): void {
        let minimumDifference = Infinity;
        let optimalQuantity = 0;

        for (let q = 0; q <= maxQ; q++) {
            const marginalDifference = Math.abs(this.revenueModel.calculateMarginalRevenue(q) -
                this.costModel.calculateMarginalCost(q));

            if (marginalDifference === 0) {
                optimalQuantity = q;
                break;
            }

            if (marginalDifference < minimumDifference) {
                optimalQuantity = q;
                minimumDifference = marginalDifference;
            }
        }
        this.maximumQuarterlyProfit = this.revenueModel.calculateTotalRevenue(optimalQuantity) -
            this.costModel.calculateTotalCost(optimalQuantity) -
            this.quarterlyResearch;

        this.maximumTotalProfit += this.maximumQuarterlyProfit;
        this.profitMaximization = this.maximumTotalProfit !== 0 ? this.totalProfit / this.maximumTotalProfit : 1.0;
    }

    adjustEconomicModels(): void {
        if (this.quarterlyProfit > 0.0) {
            const quarterlyProfitMaximization = this.quarterlyProfit / this.maximumQuarterlyProfit;
            const largeReductionCoefficient = 1.0 - quarterlyProfitMaximization / 8.0;
            const smallReductionCoefficient = 1.0 - quarterlyProfitMaximization / 12.5;

            this.revenueModel.a *= largeReductionCoefficient;
            this.revenueModel.b *= smallReductionCoefficient;
        }

        if (this.quarterlyResearch > 0.0) {
            this.researchEffectRoll = Math.random();
            const researchProfitRatio = this.quarterlyResearch / (this.totalProfit - this.quarterlyProfit);
            const largeBoostCoefficient = researchProfitRatio / 3.0;
            const smallBoostCoefficient = researchProfitRatio / 4.0;
            
            if (this.researchEffectRoll >= 0.66) {
                this.revenueModel.a *= 1.0 + largeBoostCoefficient * 1.5;
                this.revenueModel.b *= 1.0 + smallBoostCoefficient * 1.5;
            } else if (this.researchEffectRoll >= 0.33) {
                this.costModel.a *= 1.0 - largeBoostCoefficient / 3.0;
                this.costModel.c *= 1.0 - smallBoostCoefficient / 3.0;
            }
        }
    }

    describeProfitEffect(): string {
        if (this.currentTurn === 13) {
            return "";
        }

        if (this.quarterlyProfit > 0.0) {
            return "Your positive profit attracted new firms to the market, decreasing the demand for your product.";
        }

        return "";
    }

    describeResearchEffect(): string {
        if (this.currentTurn === 13) {
            return "";
        }

        if (this.quarterlyResearch > 0.0) {
            if (this.researchEffectRoll < 0.33) {
                return "Your research yielded no results.";
            } else if (this.researchEffectRoll < 0.66) {
                return "Your research lowered your costs of production.";
            } else {
                return "Your research raised the quality of your product, increasing the demand for it.";
            }
        }

        return "";
    }

    makeTurn(quantity: number, maximumQuantity: number, research: number): void {
        this.quarterlyQuantity = quantity;
        this.quarterlyResearch = research;

        this.calculateQuarterlyValues();
        this.calculateProfitMaximization(maximumQuantity);
        this.adjustEconomicModels();

        if (this.currentTurn === 12) {
            this.endSimulation();
        }
        this.currentTurn++;
    }

    calculateDuration(): string {
        const durationMiliseconds = this.finalScore.date.valueOf() - this.finalScore.startTime.valueOf();
        const durationMinutes = Math.floor(durationMiliseconds / 60000);
        const durationSeconds = Math.floor((durationMiliseconds % 60000) / 1000);

        let duration = durationMinutes + (durationMinutes === 1 ? " minute " : " minutes ");
        duration += durationSeconds + (durationSeconds === 1 ? " second" : " seconds");

        return duration;
    }

    endSimulation(): void {
        this.finalScore.date = new Date();
        this.finalScore.duration = this.calculateDuration();
        this.finalScore.totalProfit = this.totalProfit;
        this.finalScore.profitMaximization = this.profitMaximization;
        // this.scoreService.postScore(this.finalScore).subscribe();

        this.simulationRunning = false;
    }

    leaveSimulation(): void {
        this.simulationRunning = false;
    }
}
