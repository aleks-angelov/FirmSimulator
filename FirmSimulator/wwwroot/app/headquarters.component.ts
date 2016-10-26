﻿import { Component, OnInit } from "@angular/core";

import { ChartService } from "./chart.service";
import { SimulationService } from "./simulation.service";

@Component({
    selector: "my-headquarters",
    templateUrl: "app/headquarters.component.html"
})
export class HeadquartersComponent implements OnInit {
    mainChart: __Highcharts.ChartObject;

    constructor(
        private chartService: ChartService,
        private simulationService: SimulationService) {
    }

    ngOnInit() {
        this.createCharts();
    }

    createCharts() {
        this.mainChart = new Highcharts.Chart({
            chart: {
                renderTo: "headquartersMainChart",
                type: "spline"
            },
            title: {
                text: "Market Snapshot"
            },
            xAxis: {
                allowDecimals: false,
                crosshair: true,
                min: 0,
                title: {
                    align: "high",
                    text: "Quantity"
                }
            },
            yAxis: {
                crosshair: true,
                endOnTick: false,
                gridLineWidth: 0,
                lineWidth: 1,
                max: this.chartService.getYAxisMax(),
                min: 0,
                tickWidth: 1,
                title: {
                    align: "high",
                    offset: 0,
                    text: "Price",
                    rotation: 0,
                    y: -15
                }
            },
            tooltip: {
                headerFormat: "",
                pointFormat: "{series.name}: <b>{point.y}</b><br>Quantity: <b>{point.x}</b>"
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [
                {
                    color: "#7cb5ec",
                    data: this.chartService.getDemandData(),
                    name: "Demand"
                },
                {
                    color: "#f15c80",
                    data: this.chartService.getAverageCostData(),
                    name: "Average Cost"
                },
                {
                    color: "#90ed7d",
                    data: this.chartService.getMarginalRevenueData(),
                    name: "Marginal Revenue"
                },
                {
                    color: "#f7a35c",
                    data: this.chartService.getMarginalCostData(),
                    name: "Marginal Cost"
                }
            ]
        } as __Highcharts.Options);
    }
}