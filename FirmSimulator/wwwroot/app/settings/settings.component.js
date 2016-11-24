"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var settings_1 = require("./settings");
var settings_service_1 = require("./settings.service");
var users_service_1 = require("../users/users.service");
var SettingsComponent = (function () {
    function SettingsComponent(titleService, settingsService, usersService) {
        this.titleService = titleService;
        this.settingsService = settingsService;
        this.usersService = usersService;
        this.filterSettings = true;
        this.settingsModel = new settings_1.Settings();
        this.addFailed = false;
        this.active = true;
        this.formErrors = {
            'settingsDescription': "",
            'settingsRevenueA': "",
            'settingsRevenueB': "",
            'settingsCostA': "",
            'settingsCostB': "",
            'settingsCostC': ""
        };
        this.validationMessages = {
            'settingsDescription': {
                'required': "Description is required."
            },
            'settingsRevenueA': {
                'required': "Revenue: a is required."
            },
            'settingsRevenueB': {
                'required': "Revenue: b is required."
            },
            'settingsCostA': {
                'required': "Cost: a is required."
            },
            'settingsCostB': {
                'required': "Cost: b is required."
            },
            'settingsCostC': {
                'required': "Cost: c is required."
            }
        };
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Settings - Firm Simulator");
        this.getSettings();
    };
    SettingsComponent.prototype.ngAfterViewChecked = function () {
        this.formChanged();
    };
    SettingsComponent.prototype.formChanged = function () {
        var _this = this;
        if (this.currentForm === this.settingsForm) {
            return;
        }
        this.settingsForm = this.currentForm;
        if (this.settingsForm) {
            this.settingsForm.valueChanges
                .subscribe(function (data) { return _this.onValueChanged(data); });
        }
    };
    SettingsComponent.prototype.onValueChanged = function (data) {
        if (!this.settingsForm) {
            return;
        }
        var form = this.settingsForm.form;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = "";
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + " ";
                }
            }
        }
    };
    SettingsComponent.prototype.setFilter = function () {
        this.filterSettings = !this.filterSettings;
    };
    SettingsComponent.prototype.getSettings = function () {
        var _this = this;
        this.settingsService.getSettings()
            .subscribe(function (response) {
            _this.allSettings = response;
            var currentEmail = _this.usersService.currentUser.email;
            _this.filteredSettings = new Array();
            for (var i = 0; i < response.length; i++) {
                if (response[i].userEmail === currentEmail)
                    _this.filteredSettings.push(response[i]);
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    SettingsComponent.prototype.postSettings = function (set) {
        var _this = this;
        this.settingsService.postSettings(set)
            .subscribe(function (response) {
            if (response === true) {
                _this.getSettings();
                _this.newSettings();
            }
            _this.addFailed = !response;
        }, function (error) { return _this.errorMessage = error; });
    };
    SettingsComponent.prototype.newSettings = function () {
        var _this = this;
        this.settingsModel = new settings_1.Settings();
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 0);
    };
    __decorate([
        core_1.ViewChild("settingsForm"), 
        __metadata('design:type', forms_1.NgForm)
    ], SettingsComponent.prototype, "currentForm", void 0);
    SettingsComponent = __decorate([
        core_1.Component({
            selector: "sg-settings",
            templateUrl: "app/settings/settings.component.html"
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title, settings_service_1.SettingsService, users_service_1.UsersService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map