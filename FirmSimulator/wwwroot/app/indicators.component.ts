import { Component, OnInit, DoCheck } from "@angular/core";

import { ChartService } from "./chart.service";
import { SimulationService } from "./simulation.service";

@Component({
    selector: "sg-indicators",
    templateUrl: "app/indicators.component.html"
})
export class IndicatorsComponent implements OnInit, DoCheck {
    private indicatorsTopChart: __Highcharts.ChartObject;
    private indicatorsBottomChart: __Highcharts.ChartObject;

    private termDefinitions: string[];
    private currentTurn = 1;

    constructor(
        private chartService: ChartService,
        private simulationService: SimulationService) {
    }
    
    ngOnInit(): void {
        this.createIndicatorsCharts();
        this.populateTermDefinitions();
    }

    ngDoCheck(): void {
        if (this.currentTurn < this.simulationService.getCurrentTurn()) {
            this.updateIndicatorCharts(this.simulationService.getIndicatorTopPoints(), this.simulationService.getIndicatorBottomPoints());
            this.currentTurn++;
        }
    }

    createIndicatorsCharts(): void {
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

    updateIndicatorCharts(indicatorsTopPoints: number[], indicatorsBottomPoints: number[]): void {
        for (let i = 0; i < indicatorsTopPoints.length; i++) 
            this.indicatorsTopChart.series[i].addPoint(indicatorsTopPoints[i], false);
        this.indicatorsTopChart.redraw();
        
        for (let i = 0; i < indicatorsBottomPoints.length; i++)
            this.indicatorsBottomChart.series[i].addPoint(indicatorsBottomPoints[i], false);
        this.indicatorsBottomChart.redraw();
    }

    populateTermDefinitions(): void {
        this.termDefinitions = [
            "Monopolistic competition is a market structure characterized by many firms selling products that are similar but not identical, so firms compete on other factors besides price. Monopolistic competition is sometimes referred to as imperfect competition, because the market structure is between pure monopoly and pure competition. Economic efficiency is also middling.",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G"
        ];
    }

    listGroupClick(index: number): boolean {
        $("#definition").text(this.termDefinitions[index]);

        return false;
    }
}