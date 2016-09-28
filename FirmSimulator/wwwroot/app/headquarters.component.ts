import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { ChartService } from "./chart.service";
import { SplineData } from "./chart-view-models";

@Component({
    selector: "my-headquarters",
    templateUrl: "app/headquarters.component.html"
})
export class HeadquartersComponent implements OnInit {
    errorMessage: string;
    mainChart: HighchartsChartObject;

    constructor(
        private titleService: Title,
        private chartService: ChartService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Headquarters - Firm Simulator");
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
                        crosshair: true,
                        title: {
                            text: "Quantity"
                        }
                    },
                    yAxis: {
                        crosshair: true,
                        title: {
                            text: "Price"
                        }
                    },
                    tooltip: {
                        headerFormat: "", 
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