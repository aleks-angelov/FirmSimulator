/// <reference path="../../../node_modules/@types/highcharts/index.d.ts" />
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var chart_service_1 = require("../charts/chart.service");
var simulation_service_1 = require("./simulation.service");
var IndicatorsComponent = (function () {
    function IndicatorsComponent(chartService, simulationService) {
        this.chartService = chartService;
        this.simulationService = simulationService;
        this.currentTurn = 1;
    }
    IndicatorsComponent.prototype.ngOnInit = function () {
        this.createIndicatorsCharts();
        this.populateTermDefinitions();
    };
    IndicatorsComponent.prototype.ngDoCheck = function () {
        if (this.currentTurn < this.simulationService.getCurrentTurn()) {
            this.updateIndicatorCharts(this.simulationService.getIndicatorTopPoints(), this.simulationService.getIndicatorBottomPoints());
            this.currentTurn++;
        }
    };
    IndicatorsComponent.prototype.createIndicatorsCharts = function () {
        this.indicatorsTopChart = new Highcharts.Chart({
            chart: {
                renderTo: "indicatorsTopChart",
                type: "line"
            },
            title: {
                text: "Market Conditions"
            },
            xAxis: {
                categories: ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4"],
                crosshair: true,
                labels: {
                    style: {
                        fontSize: "110%"
                    }
                }
            },
            yAxis: {
                labels: {
                    format: "${value}",
                    style: {
                        fontSize: "110%"
                    }
                },
                lineWidth: 1,
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
                headerFormat: "Period: <b>{point.key}</b>",
                pointFormat: "{series.name}: <b>{point.y}</b>",
                split: true,
                valueDecimals: 2,
                valuePrefix: "$"
            },
            credits: {
                enabled: false
            },
            series: [
                {
                    color: "#7cb5ec",
                    data: [],
                    name: "Price"
                },
                {
                    color: "#f15c80",
                    data: [],
                    name: "Average Cost"
                },
                {
                    color: "#90ed7d",
                    data: [],
                    name: "Marginal Revenue"
                },
                {
                    color: "#f7a35c",
                    data: [],
                    name: "Marginal Cost"
                },
                {
                    color: "#434348",
                    data: [],
                    name: "Quantity",
                    tooltip: {
                        valueDecimals: 0,
                        valuePrefix: ""
                    }
                }
            ]
        });
        this.indicatorsBottomChart = new Highcharts.Chart({
            chart: {
                renderTo: "indicatorsBottomChart",
                type: "line"
            },
            title: {
                text: "Firm Performance"
            },
            xAxis: {
                categories: ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4"],
                crosshair: true,
                labels: {
                    style: {
                        fontSize: "110%"
                    }
                }
            },
            yAxis: {
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
                    text: "Value",
                    y: -15
                }
            },
            tooltip: {
                headerFormat: "Period: <b>{point.key}</b>",
                pointFormat: "{series.name}: <b>{point.y}</b>",
                split: true,
                valueDecimals: 2,
                valuePrefix: "$"
            },
            credits: {
                enabled: false
            },
            series: [
                {
                    color: "#7cb5ec",
                    data: [],
                    name: "Revenue"
                },
                {
                    color: "#f15c80",
                    data: [],
                    name: "Cost"
                },
                {
                    color: "#f7a35c",
                    data: [],
                    name: "Research"
                },
                {
                    color: "#90ed7d",
                    data: [],
                    name: "Profit"
                },
                {
                    color: "#434348",
                    data: [],
                    name: "Quantity",
                    tooltip: {
                        valueDecimals: 0,
                        valuePrefix: ""
                    }
                }
            ]
        });
    };
    IndicatorsComponent.prototype.updateIndicatorCharts = function (indicatorsTopPoints, indicatorsBottomPoints) {
        for (var i = 0; i < indicatorsTopPoints.length; i++)
            this.indicatorsTopChart.series[i].addPoint(indicatorsTopPoints[i], false);
        this.indicatorsTopChart.redraw();
        for (var i = 0; i < indicatorsBottomPoints.length; i++)
            this.indicatorsBottomChart.series[i].addPoint(indicatorsBottomPoints[i], false);
        this.indicatorsBottomChart.redraw();
    };
    IndicatorsComponent.prototype.populateTermDefinitions = function () {
        this.termDefinitions = [
            "Monopolistic competition is a market structure characterized by many firms selling products that are similar but not identical, so firms compete on other factors besides price. Monopolistic competition is sometimes referred to as imperfect competition, because the market structure is between pure monopoly and pure competition. Economic efficiency is also middling.",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G"
        ];
    };
    IndicatorsComponent.prototype.listGroupClick = function (index) {
        $("#definition").text(this.termDefinitions[index]);
        return false;
    };
    IndicatorsComponent = __decorate([
        core_1.Component({
            selector: "sg-indicators",
            templateUrl: "app/simulation/indicators.component.html"
        }), 
        __metadata('design:paramtypes', [chart_service_1.ChartService, simulation_service_1.SimulationService])
    ], IndicatorsComponent);
    return IndicatorsComponent;
}());
exports.IndicatorsComponent = IndicatorsComponent;
//# sourceMappingURL=indicators.component.js.map