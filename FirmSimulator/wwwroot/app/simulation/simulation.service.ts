import { Injectable } from "@angular/core";

import { Cost, Revenue } from "./simulation-models";
import { Score } from "../scores/score";
import { Settings } from "../settings/settings";

import { ScoresService } from "../scores/scores.service";

@Injectable()
export class SimulationService {
    private settingsDescription: string = null;

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
        return this.settingsDescription != null;
    }

    beginSimulation(initialSettings: Settings): void {
        this.settingsDescription = initialSettings.description;

        this.revenueModel = new Revenue(initialSettings.revenue_a, initialSettings.revenue_b);
        this.costModel = new Cost(initialSettings.cost_a, initialSettings.cost_b, initialSettings.cost_c);

        this.currentTurn = 1;
        this.finalScore = new Score();
        this.finalScore.startTime = new Date();
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
        this.finalScore.settingsDescription = this.settingsDescription;
        this.finalScore.totalProfit = 200.0;
        this.finalScore.profitMaximization = 0.95;
        //this.scoreService.postScore(this.finalScore).subscribe();

        this.settingsDescription = null;
    }

    leaveSimulation(): void {
        this.settingsDescription = null;
    }

    getCurrentTurn(): number {
        return this.currentTurn;
    }

    getRevenueModel(): Revenue {
        return this.revenueModel;
    }

    getCostModel(): Cost {
        return this.costModel;
    }

    getIndicatorTopPoints(): number[] {
        return this.indicatorTopPoints;
    }

    getIndicatorBottomPoints(): number[] {
        return this.indicatorBottomPoints;
    }
}