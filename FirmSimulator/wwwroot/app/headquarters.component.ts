import { Component, OnInit } from "@angular/core";

import { SplineData } from "./chart-view-models";

import { ChartService } from "./chart.service";
import { SimulationService } from "./simulation.service";

@Component({
    selector: "my-headquarters",
    templateUrl: "app/headquarters.component.html"
})
export class HeadquartersComponent implements OnInit {
    errorMessage: string;
    mainChart: HighchartsChartObject;

    constructor(
        private chartService: ChartService,
        private simulationService: SimulationService) {
    }

    ngOnInit() {
        this.createCharts();
    }

    createCharts() {
        this.chartService.getSplineChartData()
            .subscribe(
            data => {
                this.mainChart = new Highcharts.Chart({
                    chart: {
                        type: "spline",
                        renderTo: "headquartersMainChart"
                    },
                    title: data.title,
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
                        headerFormat: "{series.name}<br>",
                        pointFormat: "Quantity: <b>{point.x}</b><br>Price: <b>{point.y}</b>"
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    series: data.series
                });
            },
            error => this.errorMessage = (error as any));
    }
}