import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { Settings } from "./settings";

import { SettingsService } from "./settings.service";
import { UsersService } from "./users.service";

@Component({
    selector: "sg-settings",
    templateUrl: "app/settings.component.html"
})
export class SettingsComponent implements OnInit {
    private errorMessage: string;
    private allSettings: Settings[];
    private filteredSettings: Settings[];
    private settingsModel = new Settings();
    private active = true;
    private filterSettings = true;

    constructor(
        private titleService: Title,
        private settingsService: SettingsService,
        private usersService: UsersService) {
    }

    ngOnInit(): void {
        this.titleService.setTitle("Settings - Firm Simulator");
        this.getSettings();
    }

    setFilter(): void {
        this.filterSettings = !this.filterSettings;
    }

    getSettings(): void {
        this.settingsService.getSettings()
            .subscribe(
                response => {
                    this.allSettings = response;
                    const currentEmail = this.usersService.getCurrentUser().email;
                    this.filteredSettings = new Array<Settings>();
                    for (let i = 0; i < response.length; i++) {
                        if (response[i].userEmail === currentEmail)
                            this.filteredSettings.push(response[i]);
                    }
                },
                error => this.errorMessage = (error as any));
    }

    postSettings(set: Settings): void {
        this.settingsService.postSettings(set)
            .subscribe(
                response => {
                    if (response === true) {
                        this.getSettings();
                        this.newSettings();
                    }
                },
                error => this.errorMessage = (error as any));
    }

    newSettings(): void {
        this.settingsModel = new Settings();
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }
}