import { Injectable } from "@angular/core";

import { Cost, Revenue } from "./simulation-models";
import { Score } from "./score";
import { Settings } from "./settings";

import { HelperService } from "./helper.service";
import { ScoresService } from "./scores.service";
import { UsersService } from "./users.service";

@Injectable()
export class SimulationService {
    private currentSettings: Settings = null;

    constructor(
        private helperService: HelperService,
        private scoreService: ScoresService,
        private usersService: UsersService) {
    }

    getCurrentSettings(): Settings {
        return this.currentSettings;
    }

    beginSimulation(initialSettings: Settings) {
        this.currentSettings = initialSettings;
        this.testValues(12);
    }

    isSimulationRunning(): boolean {
        return this.currentSettings != null;
    }

    makeTurn() {

    }

    endSimulation() {
        const score = new Score();

        this.scoreService.postScore(score);
    }

    testValues(Q: number) {
        const testRevenue = new Revenue(-0.5, 16);
        const testCost = new Cost(1, -20, 216);

        const price = testRevenue.calculatePrice(Q);
        const tr = testRevenue.calculateTotalRevenue(Q);
        const mr = testRevenue.calculateMarginalRevenue(Q);
        const tc = testCost.calculateTotalCost(Q);
        const ac = testCost.calculateAverageCost(Q);
        const mc = testCost.calculateMarginalCost(Q);
        const profit = tr - tc;

        console.log(`Price: $${price.toFixed(2)}\nTotal Revenue: $${tr.toFixed(2)}\nMarginal Revenue: $${mr
            .toFixed(2)}\n\nTotal Cost: $${tc.toFixed(2)}\nAverage Cost: $${ac.toFixed(2)}\nMarginal Cost: $${mc
            .toFixed(2)}\n\nProfit: $${profit.toFixed(2)}`);
    }
}