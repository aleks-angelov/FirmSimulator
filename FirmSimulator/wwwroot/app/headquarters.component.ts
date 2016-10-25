import { Component, OnInit, DoCheck } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { Settings } from "./settings";
import { SplineData } from "./chart-view-models";

import { ChartService } from "./chart.service";
import { HeadquartersService } from "./headquarters.service";
import { SettingsService } from "./settings.service";
import { UsersService } from "./users.service";

@Component({
    selector: "my-headquarters",
    templateUrl: "app/headquarters.component.html"
})
export class HeadquartersComponent implements OnInit, DoCheck {
    errorMessage: string;
    userSettings = new Array<Settings>();
    settingsModel = new Settings();
    simulationRunning = false;
    mainChart: HighchartsChartObject;

    constructor(
        private titleService: Title,
        private chartService: ChartService,
        private headquartersService: HeadquartersService,
        private settingsService: SettingsService,
        private usersService: UsersService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Headquarters - Firm Simulator");
        this.getUserSettings();
    }

    ngDoCheck() {
        this.simulationRunning = this.headquartersService.isSimulationRunning();
    }

    getUserSettings() {
        this.settingsService.getSettings()
            .subscribe(
                response => {
                    const currentEmail = this.usersService.getCurrentUser().email;
                    for (let i = 0; i < response.length; i++) {
                        if (response[i].userEmail === currentEmail)
                            this.userSettings.push(response[i]);
                    }
                    for (let i = 0; i < this.userSettings.length; i++) {
                        if (this.userSettings[i].description === "Defaults")
                            this.settingsModel = this.userSettings[i];
                    }
                },
                error => this.errorMessage = (error as any));
    }

    onSelectChange(settingsDescription) {
        for (let i = 0; i < this.userSettings.length; i++) {
            if (this.userSettings[i].description === settingsDescription)
                this.settingsModel = this.userSettings[i];
        }
    }

    beginSimulation() {
        this.headquartersService.beginSimulation(this.settingsModel);
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