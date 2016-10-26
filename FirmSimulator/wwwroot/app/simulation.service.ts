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

    testValues(Q: number) {
        const price = this.revenueModel.calculatePrice(Q);
        const tr = this.revenueModel.calculateTotalRevenue(Q);
        const mr = this.revenueModel.calculateMarginalRevenue(Q);
        const tc = this.costModel.calculateTotalCost(Q);
        const ac = this.costModel.calculateAverageCost(Q);
        const mc = this.costModel.calculateMarginalCost(Q);
        const profit = tr - tc;

        console.log(`Settings: ${this.settingsDescription}\n\nPrice: $${price.toFixed(2)}\nTotal Revenue: $${tr.toFixed(2)}\nMarginal Revenue: $${mr
            .toFixed(2)}\n\nTotal Cost: $${tc.toFixed(2)}\nAverage Cost: $${ac.toFixed(2)}\nMarginal Cost: $${mc
                .toFixed(2)}\n\nProfit: $${profit.toFixed(2)}`);
    }

    isSimulationRunning(): boolean {
        return this.settingsDescription != null;
    }

    beginSimulation(initialSettings: Settings) {
        this.settingsDescription = initialSettings.description;
        this.revenueModel = new Revenue(initialSettings.revenue_a, initialSettings.revenue_b);
        this.costModel = new Cost(initialSettings.cost_a, initialSettings.cost_b, initialSettings.cost_c);
        this.testValues(12);
    }

    makeTurn() {

    }

    endSimulation() {
        const score = new Score();

        this.scoreService.postScore(score);
    }
}