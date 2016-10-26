﻿import { Injectable } from "@angular/core";

import { SplinePoint } from "./chart-models";

@Injectable()
export class ChartService {
    getDemandData() {
        const data: SplinePoint[] = [
            { x: 0, y: 5 }, { x: 1, y: 4 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 4, y: 1 }, { x: 5, y: 0 }
        ];

        return data;
    }

    getMarginalRevenueData() {
        const data: SplinePoint[] = [
            { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }
        ];

        return data;
    }

    getAverageTotalCostData() {
        const data: SplinePoint[] = [
            { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }
        ];

        return data;
    }

    getMarginalCostData() {
        const data: SplinePoint[] = [
            { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 5 }
        ];

        return data;
    }
}