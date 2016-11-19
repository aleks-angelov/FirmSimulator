import { Injectable } from "@angular/core";

import { Cost, Revenue } from "./simulation-models";
import { Score } from "../scores/score";
import { Settings } from "../settings/settings";

import { ScoresService } from "../scores/scores.service";

@Injectable()
export class SimulationService {
    private simulationRunning = false;

    private revenueModel: Revenue;
    private costModel: Cost;

    private currentTurn: number;
    private finalScore: Score;

    private indicatorTopPoints: number[];
    private indicatorBottomPoints: number[];

    constructor(
        private scoreService: ScoresService) {
    }

    isSimulationRunning(): boolean {
        return this.simulationRunning;
    }

    beginSimulation(initialSettings: Settings): void {
        this.finalScore = new Score();
        this.finalScore.startTime = new Date();
        this.finalScore.settingsDescription = initialSettings.description;
        this.finalScore.userEmail = initialSettings.userEmail;

        this.revenueModel = new Revenue(initialSettings.revenue_a, initialSettings.revenue_b);
        this.costModel = new Cost(initialSettings.cost_a, initialSettings.cost_b, initialSettings.cost_c);

        this.currentTurn = 1;
        this.simulationRunning = true;
    }

    makeTurn(): void {
        if (this.currentTurn < 12) {
            this.indicatorTopPoints = [];
            this.indicatorTopPoints.push(5);
            this.indicatorTopPoints.push(4);
            this.indicatorTopPoints.push(3);
            this.indicatorTopPoints.push(2);
            this.indicatorTopPoints.push(1);

            this.indicatorBottomPoints = [];
            this.indicatorBottomPoints.push(5);
            this.indicatorBottomPoints.push(4);
            this.indicatorBottomPoints.push(3);
            this.indicatorBottomPoints.push(2);
            this.indicatorBottomPoints.push(1);
        } else if (this.currentTurn === 12) {
            this.endSimulation();
        }
        this.currentTurn++;
    }

    endSimulation(): void {
        this.finalScore.date = new Date();
        this.finalScore.duration = "16 minutes 16 seconds"
        this.finalScore.totalProfit = 200.0;
        this.finalScore.profitMaximization = 0.95;
        //this.scoreService.postScore(this.finalScore).subscribe();

        this.simulationRunning = false;
    }

    leaveSimulation(): void {
        this.simulationRunning = false;
    }

    getRevenueModel(): Revenue {
        return this.revenueModel;
    }

    getCostModel(): Cost {
        return this.costModel;
    }

    getCurrentTurn(): number {
        return this.currentTurn;
    }

    getFinalScore(): Score {
        return this.finalScore;
    }

    getIndicatorTopPoints(): number[] {
        return this.indicatorTopPoints;
    }

    getIndicatorBottomPoints(): number[] {
        return this.indicatorBottomPoints;
    }
}