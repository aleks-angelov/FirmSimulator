import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { Settings } from "./settings";
import { SettingsService } from "./settings.service";
import { UsersService } from "./users.service";

@Component({
    selector: "my-settings",
    templateUrl: "app/settings.component.html"
})
export class SettingsComponent implements OnInit {
    errorMessage: string;
    settingses: Settings[];
    settingsModel = new Settings();
    active = true;

    constructor(
        private titleService: Title,
        private settingsService: SettingsService,
        private usersService: UsersService) {
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

    postSettings(set: Settings) {
        this.settingsService.postSettings(set)
            .subscribe(
            response => {
                if (response === true) {
                    this.getAllSettings();
                    this.newSettings();
                }
            },
            error => this.errorMessage = (error as any));
    }

    newSettings() {
        this.settingsModel = new Settings();
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }
}