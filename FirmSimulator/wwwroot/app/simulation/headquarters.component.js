/// <reference path="../../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../../node_modules/@types/jqueryui/index.d.ts" />
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
var HeadquartersComponent = (function () {
    function HeadquartersComponent(chartService, simulationService) {
        this.chartService = chartService;
        this.simulationService = simulationService;
        this.progressPercentage = 4.35;
        this.totalProfit = 100.0;
        this.profitMaximization = 1.0;
    }
    HeadquartersComponent.prototype.ngOnInit = function () {
        this.createHeadquartersCharts();
    };
    HeadquartersComponent.prototype.ngAfterViewInit = function () {
        $("#quantitySlider")
            .slider({
            value: 5,
            min: 0,
            max: this.chartService.getMaxQ(),
            step: 1,
            slide: function (event, ui) {
                $("#quantityAmount").val("" + ui.value);
            }
        });
        $("#quantityAmount").val("" + $("#quantitySlider").slider("value"));
        $("#researchSlider")
            .slider({
            value: 0,
            min: 0,
            max: 10,
            step: 1,
            slide: function (event, ui) {
                $("#researchAmount").val("$" + ui.value + ".00");
            }
        });
        $("#researchAmount").val("$" + $("#researchSlider").slider("value") + ".00");
    };
    HeadquartersComponent.prototype.makeProgress = function () {
        this.progressPercentage += 8.3;
        if (this.progressPercentage > 100.0)
            this.progressPercentage = 100.0;
        $("#timeProgress").css("width", this.progressPercentage.toString() + "%");
        this.simulationService.makeTurn();
        this.updateHeadquartersCharts();
    };
    HeadquartersComponent.prototype.createHeadquartersCharts = function () {
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
        });
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
        });
    };
    HeadquartersComponent.prototype.updateHeadquartersCharts = function () {
        this.headquartersLeftChart.series[0].setData(this.chartService.getPriceData(), false);
        this.headquartersLeftChart.series[1].setData(this.chartService.getAverageCostData(), false);
        this.headquartersLeftChart.series[2].setData(this.chartService.getMarginalRevenueData(), false);
        this.headquartersLeftChart.series[3].setData(this.chartService.getMarginalCostData(), false);
        this.headquartersLeftChart.redraw();
        //this.headquartersRightChart.series[0].setData();
        //this.headquartersRightChart.series[1].setData();
        //this.headquartersRightChart.series[2].setData();
        //this.headquartersRightChart.series[3].setData();
        //this.headquartersRightChart.redraw();
    };
    HeadquartersComponent = __decorate([
        core_1.Component({
            selector: "sg-headquarters",
            templateUrl: "app/simulation/headquarters.component.html"
        }), 
        __metadata('design:paramtypes', [chart_service_1.ChartService, simulation_service_1.SimulationService])
    ], HeadquartersComponent);
    return HeadquartersComponent;
}());
exports.HeadquartersComponent = HeadquartersComponent;
//# sourceMappingURL=headquarters.component.js.map