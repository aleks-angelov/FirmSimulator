/// <reference path="../../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../../node_modules/@types/jqueryui/index.d.ts" />
/// <reference path="../../../node_modules/@types/highcharts/index.d.ts" />

import { Component, OnInit, AfterViewInit } from "@angular/core";

import { Score } from "../scores/score";

import { ChartService } from "../charts/chart.service";
import { SimulationService } from "./simulation.service";

@Component({
    selector: "sg-headquarters",
    templateUrl: "app/simulation/headquarters.component.html"
})
export class HeadquartersComponent implements OnInit, AfterViewInit {
    private progressPercentage = 4.35;
    private finalScore = new Score();

    private headquartersLeftChart: Highcharts.ChartObject;
    private headquartersRightChart: Highcharts.ChartObject;

    private totalProfit = 100.0;
    private profitMaximization = 1.0;

    constructor(
        private chartService: ChartService,
        private simulationService: SimulationService) {
    }

    ngOnInit(): void {
        this.createHeadquartersCharts();
    }

    ngAfterViewInit(): void {
        $("#quantitySlider")
            .slider({
                value: 0,
                min: 0,
                max: this.chartService.maxQ,
                step: 1,
                slide(event, ui) {
                    $("#quantityAmount").val(`${ui.value}`);
                }
            });
        $("#quantityAmount").val(`${$("#quantitySlider").slider("value")}`);

        $("#researchSlider")
            .slider({
                value: 0,
                min: 0,
                max: Math.max(0, this.totalProfit),
                step: 5,
                slide(event, ui) {
                    $("#researchAmount").val(`$${ui.value}.00`);
                }
            });
        $("#researchAmount").val(`$${$("#researchSlider").slider("value")}.00`);
    }

    makeProgress(): void {
        this.progressPercentage += 8.3;
        if (this.progressPercentage > 100.0) {
            this.progressPercentage = 100.0;
            this.finalScore = this.simulationService.finalScore;
            $("#scoreToggle").click();
        }

        $("#timeProgress").css("width", this.progressPercentage.toString() + "%");

        this.simulationService.makeTurn($("#quantitySlider").slider("value"),
            this.chartService.maxQ,
            $("#researchSlider").slider("value"));

        this.updateHeadquartersCharts();

        this.totalProfit = this.simulationService.totalProfit;
        this.profitMaximization = this.simulationService.profitMaximization;

        this.ngAfterViewInit();
    }

    createHeadquartersCharts(): void {
        this.headquartersLeftChart = new Highcharts.Chart({
            chart: {
                renderTo: "headquartersLeftChart",
                type: "spline"
            },
            title: {
                text: "Current Snapshot"
            },
            xAxis: {
                allowDecimals: false,
                crosshair: true,
                labels: {
                    style: {
                        fontSize: "110%"
                    }
                },
                min: 0
            },
            yAxis: {
                crosshair: true,
                endOnTick: false,
                gridLineWidth: 0,
                labels: {
                    format: "${value}",
                    style: {
                        fontSize: "110%"
                    }
                },
                lineWidth: 1,
                max: this.chartService.getMaxPrice(),
                min: 0,
                tickWidth: 1,
                title: {
                    align: "high",
                    offset: 0,
                    rotation: 0,
                    style: {
                        fontSize: "110%"
                    },
                    text: "Value",
                    y: -15
                }
            },
            tooltip: {
                headerFormat: "Quantity: <b>{point.key}</b>",
                pointFormat: "{series.name}: <b>{point.y}</b>",
                split: true,
                valueDecimals: 2,
                valuePrefix: "$"
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [
                {
                    color: "#7cb5ec",
                    data: this.chartService.getPriceData(),
                    name: "Price"
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
        } as Object);

        this.headquartersRightChart = new Highcharts.Chart({
            chart: {
                renderTo: "headquartersRightChart",
                type: "column"
            },
            title: {
                text: "Previous Quarter"
            },
            subtitle: {
                text: "Quantity: " + "<b>20</b>",
                style: {
                    fontSize: "125%"
                }
            },
            legend: {
                enabled: false
            },
            xAxis: {
                categories: ["Revenue", "Cost", "Research", "Profit"],
                labels: {
                    style: {
                        fontSize: "110%"
                    }
                }
            },
            yAxis: {
                endOnTick: false,
                labels: {
                    format: "${value}",
                    style: {
                        fontSize: "110%"
                    }
                },
                lineWidth: 1,
                tickWidth: 1,
                title: {
                    align: "high",
                    offset: 0,
                    rotation: 0,
                    style: {
                        fontSize: "110%"
                    },
                    text: "Amount",
                    y: -15
                }
            },
            tooltip: {
                headerFormat: "",
                pointFormat: "{point.category}: <b>{point.y}</b>",
                valueDecimals: 2,
                valuePrefix: "$"
            },
            credits: {
                enabled: false
            },
            series: [
                {
                    data: [
                        {
                            y: 15.0,
                            color: "#7cb5ec"
                        },
                        {
                            y: 20.5,
                            color: "#f15c80"
                        },
                        {
                            y: 5.0,
                            color: "#f7a35c"
                        },
                        {
                            y: -10.5,
                            color: "#90ed7d"
                        }
                    ]
                }
            ]
        } as Object);
    }

    updateHeadquartersCharts(): void {
        this.headquartersLeftChart.series[0].setData(this.chartService.getPriceData(), false);
        this.headquartersLeftChart.series[1].setData(this.chartService.getAverageCostData(), false);
        this.headquartersLeftChart.series[2].setData(this.chartService.getMarginalRevenueData(), false);
        this.headquartersLeftChart.series[3].setData(this.chartService.getMarginalCostData(), false);
        this.headquartersLeftChart.redraw();

        this.headquartersRightChart.series[0].setData([
            {
                y: this.simulationService.quarterlyRevenue,
                color: "#7cb5ec"
            },
            {
                y: this.simulationService.quarterlyCost,
                color: "#f15c80"
            },
            {
                y: this.simulationService.quarterlyResearch,
                color: "#f7a35c"
            },
            {
                y: this.simulationService.quarterlyProfit,
                color: "#90ed7d"
            }
        ]);
    }
}