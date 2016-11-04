import { Component, OnInit, DoCheck } from "@angular/core";

import { ChartService } from "./chart.service";
import { SimulationService } from "./simulation.service";

@Component({
    selector: "my-indicators",
    templateUrl: "app/indicators.component.html"
})
export class IndicatorsComponent implements OnInit, DoCheck {
    indicatorsTopChart: __Highcharts.ChartObject;
    indicatorsBottomChart: __Highcharts.ChartObject;
    currentTurn = 1;

    constructor(
        private chartService: ChartService,
        private simulationService: SimulationService) {
    }

    ngOnInit() {
        this.createIndicatorsCharts();
    }

    ngDoCheck() {
        if (this.currentTurn < this.simulationService.getCurrentTurn()) {
            this.updateIndicatorCharts(this.simulationService.getIndicatorTopPoints(), this.simulationService.getIndicatorBottomPoints());
            this.currentTurn++;
        }
    }

    createIndicatorsCharts() {
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
        } as __Highcharts.Options);

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
        } as __Highcharts.Options);
    }

    updateIndicatorCharts(indicatorTopPoints: number[], indicatorBottomPoints: number[]) {
        for (let i = 0; i < indicatorTopPoints.length; i++) 
            this.indicatorsTopChart.series[i].addPoint(indicatorTopPoints[i], false);
        this.indicatorsTopChart.redraw();
        
        for (let i = 0; i < indicatorBottomPoints.length; i++)
            this.indicatorsBottomChart.series[i].addPoint(indicatorBottomPoints[i], false);
        this.indicatorsBottomChart.redraw();
    }
}