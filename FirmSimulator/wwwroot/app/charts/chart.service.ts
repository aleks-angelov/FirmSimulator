import { Injectable } from "@angular/core";

import { Cost, Revenue } from "../simulation/simulation-models";
import { SplinePoint } from "./chart-models";

import { SimulationService } from "../simulation/simulation.service";

@Injectable()
export class ChartService {
    maxQ: number;

    constructor(
        private simulationService: SimulationService) {
    }

    getMaxPrice(): number {
        return Math.round(this.simulationService.revenueModel.calculatePrice(0)) + 1;
    }

    getPriceData(): SplinePoint[] {
        const revenueModel = this.simulationService.revenueModel;
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

    getQuarterlyPrice(): number {
        return this.simulationService.revenueModel.calculatePrice(this.simulationService.quarterlyQuantity);
    }

    getAverageCostData(): SplinePoint[] {
        const costModel = this.simulationService.costModel;
        const data: SplinePoint[] = [];
        for (let i = 1; i < this.maxQ; i++)
            data.push({ x: i, y: parseFloat(costModel.calculateAverageCost(i).toFixed(2)) });

        return data;
    }

    getQuarterlyAverageCost(): number {
        return this.simulationService.costModel.calculateAverageCost(this.simulationService.quarterlyQuantity);
    }

    getMarginalRevenueData(): SplinePoint[] {
        const revenueModel = this.simulationService.revenueModel;
        const data: SplinePoint[] = [];
        for (let i = 0; i < this.maxQ; i++)
            data.push({ x: i, y: parseFloat(revenueModel.calculateMarginalRevenue(i).toFixed(2)) });

        return data;
    }

    getQuarterlyMarginalRevenue(): number {
        return this.simulationService.revenueModel.calculateMarginalRevenue(this.simulationService.quarterlyQuantity);
    }

    getMarginalCostData(): SplinePoint[] {
        const costModel = this.simulationService.costModel;
        const data: SplinePoint[] = [];
        for (let i = 0; i < this.maxQ; i++)
            data.push({ x: i, y: parseFloat(costModel.calculateMarginalCost(i).toFixed(2)) });

        return data;
    }

    getQuarterlyMarginalCost(): number {
        return this.simulationService.costModel.calculateMarginalCost(this.simulationService.quarterlyQuantity);
    }
}