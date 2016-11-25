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
    private maximumTotalProfit: number;
    profitMaximization: number;

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
        const maximumProfit = this.revenueModel.calculateTotalRevenue(optimalQuantity) -
            this.costModel.calculateTotalCost(optimalQuantity) -
            this.quarterlyResearch;

        this.maximumTotalProfit += maximumProfit;
        this.profitMaximization = this.maximumTotalProfit !== 0 ? this.totalProfit / this.maximumTotalProfit : 1.0;
        //console.log(this.totalProfit + " / " + this.maximumTotalProfit + " = " + this.profitMaximization);
    }

    calculateResearchResults(): number {
        if (this.quarterlyResearch === 0) {
            return 0;
        } else {
            return 0;
        }
    }

    adjustModels(): void {

    }

    describeProfitEffect(): string {
        const demandEffect = "Your positive profit attracted new firms to the market, decreasing the demand for your product.";

        if (this.currentTurn === 13) {
            return "";
        }
        
        const ef = Math.floor((Math.random() * 2) + 1);
        switch (ef) {
            case 1:
                return "";
            case 2:
                return demandEffect;
            default:
                return "";
        }
    }

    describeResearchEffect(): string {
        const costEffect = "Your research lowered your costs of production.";
        const noEffect = "Your research yielded no results.";
        const demandEffect = "Your research raised the quality of your product, increasing the demand for it.";

        if (this.currentTurn === 13) {
            return "";
        }

        const ef = Math.floor((Math.random() * 4) + 1);
        switch (ef) {
            case 1:
                return costEffect;
            case 2:
                return noEffect;
            case 3:
                return demandEffect;
            case 4:
                return "";
            default:
                return "";
        }
    }

    makeTurn(quantity: number, maximumQuantity: number, research: number): void {
        this.quarterlyQuantity = quantity;
        this.quarterlyResearch = research;

        this.calculateQuarterlyValues();
        this.calculateProfitMaximization(maximumQuantity);
        this.calculateResearchResults();
        this.adjustModels();

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
        //this.scoreService.postScore(this.finalScore).subscribe();

        this.simulationRunning = false;
    }

    leaveSimulation(): void {
        this.simulationRunning = false;
    }
}