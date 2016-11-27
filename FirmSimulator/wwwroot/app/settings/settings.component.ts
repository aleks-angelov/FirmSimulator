import { Component, OnInit, AfterViewChecked, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Title } from "@angular/platform-browser";

import { Settings } from "./settings";

import { SettingsService } from "./settings.service";
import { UsersService } from "../users/users.service";

@Component({
    selector: "sg-settings",
    templateUrl: "app/settings/settings.component.html"
})
export class SettingsComponent implements OnInit, AfterViewChecked {
    private errorMessage: string;

    private allSettings: Settings[];
    private filteredSettings: Settings[];
    private filterSettings = true;

    private settingsForm: NgForm;
    @ViewChild("settingsForm")
    currentForm: NgForm;

    private settingsModel = new Settings();
    private addFailed = false;
    private active = true;

    formErrors = {
        "settingsDescription": "",
        "settingsRevenueA": "",
        "settingsRevenueB": "",
        "settingsCostA": "",
        "settingsCostB": "",
        "settingsCostC": ""
    };

    private validationMessages = {
        "settingsDescription": {
            "required": "Description is required."
        },
        "settingsRevenueA": {
            "required": "Revenue: a is required."
        },
        "settingsRevenueB": {
            "required": "Revenue: b is required."
        },
        "settingsCostA": {
            "required": "Cost: a is required."
        },
        "settingsCostB": {
            "required": "Cost: b is required."
        },
        "settingsCostC": {
            "required": "Cost: c is required."
        }
    };

    constructor(
        private titleService: Title,
        private settingsService: SettingsService,
        private usersService: UsersService) {
    }

    ngOnInit(): void {
        this.titleService.setTitle("Settings - Firm Simulator");
        this.getSettings();
    }

    ngAfterViewChecked(): void {
        this.formChanged();
    }

    formChanged(): void {
        if (this.currentForm === this.settingsForm) {
            return;
        }
        this.settingsForm = this.currentForm;
        if (this.settingsForm) {
            this.settingsForm.valueChanges
                .subscribe((data: any) => this.onValueChanged(data));
        }
    }

    onValueChanged(data?: any): void {
        if (!this.settingsForm) {
            return;
        }
        const form = this.settingsForm.form;

        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = "";
                const control = form.get(field);

                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + " ";
                        }
                    }
                }
            }
        }
    }

    setFilter(): void {
        this.filterSettings = !this.filterSettings;
    }

    getSettings(): void {
        this.settingsService.getSettings()
            .subscribe(
            (response: any) => {
                this.allSettings = response;
                const currentEmail = this.usersService.currentUser.email;
                this.filteredSettings = new Array<Settings>();
                for (let i = 0; i < response.length; i++) {
                    if (response[i].userEmail === currentEmail) {
                        this.filteredSettings.push(response[i]);
                    }
                }
            },
            error => this.errorMessage = (error as any));
    }

    postSettings(set: Settings): void {
        this.settingsService.postSettings(set)
            .subscribe(
            (response: any) => {
                if (response === true) {
                    this.getSettings();
                    this.newSettings();
                }
                this.addFailed = !response;
            },
            error => this.errorMessage = (error as any));
    }

    newSettings(): void {
        this.settingsModel = new Settings();
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }
}
