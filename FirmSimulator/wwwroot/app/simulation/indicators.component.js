/// <reference path="../../../node_modules/@types/highcharts/index.d.ts"/>
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
        if (this.currentTurn < this.simulationService.currentTurn) {
            this.updateIndicatorCharts();
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
    IndicatorsComponent.prototype.updateIndicatorCharts = function () {
        this.indicatorsTopChart.series[0].addPoint({ y: this.chartService.getQuarterlyPrice() }, false);
        this.indicatorsTopChart.series[1].addPoint({ y: this.chartService.getQuarterlyAverageCost() }, false);
        this.indicatorsTopChart.series[2].addPoint({ y: this.chartService.getQuarterlyMarginalRevenue() }, false);
        this.indicatorsTopChart.series[3].addPoint({ y: this.chartService.getQuarterlyMarginalCost() }, false);
        this.indicatorsTopChart.series[4].addPoint({ y: this.simulationService.quarterlyQuantity }, false);
        this.indicatorsTopChart.redraw();
        this.indicatorsBottomChart.series[0].addPoint({ y: this.simulationService.quarterlyRevenue }, false);
        this.indicatorsBottomChart.series[1].addPoint({ y: this.simulationService.quarterlyCost }, false);
        this.indicatorsBottomChart.series[2].addPoint({ y: this.simulationService.quarterlyResearch }, false);
        this.indicatorsBottomChart.series[3].addPoint({ y: this.simulationService.quarterlyProfit }, false);
        this.indicatorsBottomChart.series[4].addPoint({ y: this.simulationService.quarterlyQuantity }, false);
        this.indicatorsBottomChart.redraw();
    };
    IndicatorsComponent.prototype.populateTermDefinitions = function () {
        this.termDefinitions = [
            "A market structure in which many firms offer products or services that are similar, but are not perfect substitutes. Barriers to entry and exit in the market are low, and the decisions of any one firm do not directly affect those of its competitors. All firms have the same, relatively low degree of market power; they are able to determine their own prices.",
            "Production cost per unit of output, computed by dividing the total of fixed costs and variable costs by the number of total units produced (total output, Q). It is also equal to the sum of average variable costs (total variable costs divided by Q) plus average fixed costs (total fixed costs divided by Q). A lower average cost is a potential competitive advantage.",
            "The increase in revenue that results from the sale of one additional unit of output. While it can remain constant over a certain level of output, it follows the law of diminishing returns and will eventually slow down, as the output level increases. Competitive firms continue producing output until marginal revenue equals marginal cost.",
            "The change in the total cost that arises when the quantity produced is incremented by one unit, i.e. the cost of producing one more unit of a good. Marginal cost at each level of production includes any additional costs required to produce the next unit. It is often used as a means of isolating an optimum production level.",
            "The total flow of income to a firm from selling a given quantity of output at a given price, less any incurred taxes. It is calculated by multiplying the quantity of each good and service sold by its corresponding price. Revenue provides the income which a firm needs to enable it to cover its costs of production, and from which it can derive a profit.",
            "The total economic cost of production. It is made up of variable costs, which vary according to the quantity of a good produced and include inputs such as labor and raw materials, plus fixed costs, which are independent of the quantity of a good produced and include inputs that cannot be varied in the short term such as capital.",
            "Maximizing profits is assumed to be the dominant goal of a typical firm. It means selling a quantity of a good or service, or fixing a price, where total revenue is the greatest above total cost. This is consistent with producing up to the point where the marginal revenue from selling one extra unit exactly equals the marginal cost of producing that unit."
        ];
    };
    IndicatorsComponent.prototype.listGroupClick = function (index) {
        $("#definition").text(this.termDefinitions[index]);
        return false;
    };
    IndicatorsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "sg-indicators",
            templateUrl: "indicators.component.html"
        }), 
        __metadata('design:paramtypes', [chart_service_1.ChartService, simulation_service_1.SimulationService])
    ], IndicatorsComponent);
    return IndicatorsComponent;
}());
exports.IndicatorsComponent = IndicatorsComponent;
//# sourceMappingURL=indicators.component.js.map