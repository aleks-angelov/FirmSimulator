import { Injectable } from "@angular/core";

import { Cost, Revenue } from "../simulation/simulation-models";
import { SplinePoint } from "./chart-models";

import { SimulationService } from "../simulation/simulation.service";

@Injectable()
export class ChartService {
    private maxQ: number;

    constructor(
        private simulationService: SimulationService) {
    }

    getMaxQ(): number {
        return this.maxQ;
    }

    getMaxPrice(): number {
        return Math.round(this.simulationService.getRevenueModel().calculatePrice(0));
    }

    getPriceData(): SplinePoint[] {
        const revenueModel = this.simulationService.getRevenueModel();
        const data: SplinePoint[] = [];
        let q = 0;
        let p = parseFloat(revenueModel.calculatePrice(0).toFixed(2));
        while (p >= 0) {
            data.push({ x: q, y: p });
            q++;
            p = parseFloat(revenueModel.calculatePrice(q).toFixed(2));
        }
        this.maxQ = q - 1;

        return data;
    }

    getAverageCostData(): SplinePoint[] {
        const costModel = this.simulationService.getCostModel();
        const data: SplinePoint[] = [];
        for (let i = 1; i < this.maxQ; i++)
            data.push({ x: i, y: parseFloat(costModel.calculateAverageCost(i).toFixed(2)) });

        return data;
    }

    getMarginalRevenueData(): SplinePoint[] {
        const revenueModel = this.simulationService.getRevenueModel();
        const data: SplinePoint[] = [];
        for (let i = 0; i < this.maxQ; i++)
            data.push({ x: i, y: parseFloat(revenueModel.calculateMarginalRevenue(i).toFixed(2)) });

        return data;
    }

    getMarginalCostData(): SplinePoint[] {
        const costModel = this.simulationService.getCostModel();
        const data: SplinePoint[] = [];
        for (let i = 0; i < this.maxQ; i++)
            data.push({ x: i, y: parseFloat(costModel.calculateMarginalCost(i).toFixed(2)) });

        return data;
    }
}