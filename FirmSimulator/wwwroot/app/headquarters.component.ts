import { Component, OnInit, AfterViewInit } from "@angular/core";

import { ChartService } from "./chart.service";
import { SimulationService } from "./simulation.service";

@Component({
    selector: "my-headquarters",
    templateUrl: "app/headquarters.component.html"
})
export class HeadquartersComponent implements OnInit, AfterViewInit {
    mainChart: __Highcharts.ChartObject;
    progressPercentage = 4.35;

    constructor(
        private chartService: ChartService,
        private simulationService: SimulationService) {
    }

    ngOnInit() {
        this.createCharts();
    }

    ngAfterViewInit() {
        $("#quantitySlider")
            .slider({
                value: 5,
                min: 0,
                max: this.chartService.getMaxQ(),
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
                max: 10,
                step: 1,
                slide(event, ui) {
                    $("#researchAmount").val(`$${ui.value}.00`);
                }
            });
        $("#researchAmount").val(`$${$("#researchSlider").slider("value")}.00`);
    }

    makeProgress() {
        this.progressPercentage += 8.3;
        if (this.progressPercentage > 100.0)
            this.progressPercentage = 100.0;

        $("#timeProgress").css("width", this.progressPercentage.toString() + "%");
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
                max: this.chartService.getMaxPrice(),
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