import { Injectable } from "@angular/core";

import { Cost, Revenue } from "./simulation-models";
import { Score } from "./score";
import { Settings } from "./settings";

import { ScoresService } from "./scores.service";

@Injectable()
export class SimulationService {
    private settingsDescription: string = null;
    private revenueModel: Revenue;
    private costModel: Cost;

    constructor(
        private scoreService: ScoresService) {
    }

    getRevenueModel(): Revenue {
        return this.revenueModel;
    }

    getCostModel(): Cost {
        return this.costModel;
    }

    isSimulationRunning(): boolean {
        return this.settingsDescription != null;
    }

    beginSimulation(initialSettings: Settings) {
        this.settingsDescription = initialSettings.description;
        this.revenueModel = new Revenue(initialSettings.revenue_a, initialSettings.revenue_b);
        this.costModel = new Cost(initialSettings.cost_a, initialSettings.cost_b, initialSettings.cost_c);
    }

    makeTurn() {

    }

    endSimulation() {
        const score = new Score();

        this.scoreService.postScore(score);
    }
}