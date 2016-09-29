import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { Settings } from "./settings";
import { SettingsService } from "./settings.service";

@Component({
    selector: "my-settings",
    templateUrl: "app/settings.component.html"
})
export class SettingsComponent implements OnInit {
    errorMessage: string;
    settingses: Settings[];

    constructor(
        private titleService: Title,
        private settingsService: SettingsService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Settings - Firm Simulator");
        this.getAllSettings();
    }

    getAllSettings() {
        this.settingsService.getAllSettings()
            .subscribe(
                response => this.settingses = response,
                error => this.errorMessage = (error as any));
    }
}