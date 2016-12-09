import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

import { Settings } from "../settings/settings-model";

import { SettingsService } from "../settings/settings.service";
import { SimulationService } from "../simulation/simulation.service";
import { UsersService } from "../users/users.service";

@Component({
    moduleId: module.id,
    selector: "sg-introduction",
    templateUrl: "introduction.component.html"
})
export class IntroductionComponent implements OnInit {
    private errorMessage: string;
    private userSettings = new Array<Settings>();
    private settingsModel = new Settings();

    constructor(
        private titleService: Title,
        private router: Router,
        private simulationService: SimulationService,
        private settingsService: SettingsService,
        private usersService: UsersService) {
    }

    ngOnInit(): void {
        this.titleService.setTitle("Introduction - Firm Simulator");
        this.getUserSettings();
    }

    getUserSettings(): void {
        this.settingsService.getSettings()
            .subscribe(
            (response: any) => {
                const currentEmail = this.usersService.currentUser.email;
                for (let i = 0; i < response.length; i++) {
                    if (response[i].userEmail === currentEmail) {
                        this.userSettings.push(response[i]);
                    }
                }
                for (let i = 0; i < this.userSettings.length; i++) {
                    if (this.userSettings[i].description === "Defaults") {
                        this.settingsModel = this.userSettings[i];
                    }
                }
            },
            error => this.errorMessage = (error as any));
    }

    onSelectChange(settingsDescription: any): void {
        for (let i = 0; i < this.userSettings.length; i++) {
            if (this.userSettings[i].description === settingsDescription) {
                this.settingsModel = this.userSettings[i];
            }
        }
    }

    beginSimulation(): void {
        this.simulationService.beginSimulation(this.settingsModel);
        this.router.navigate(["/simulation"]);
    }
}
