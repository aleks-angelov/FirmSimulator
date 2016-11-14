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
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var settings_1 = require("../settings/settings");
var settings_service_1 = require("../settings/settings.service");
var simulation_service_1 = require("../simulation/simulation.service");
var users_service_1 = require("../users/users.service");
var IntroductionComponent = (function () {
    function IntroductionComponent(titleService, router, simulationService, settingsService, usersService) {
        this.titleService = titleService;
        this.router = router;
        this.simulationService = simulationService;
        this.settingsService = settingsService;
        this.usersService = usersService;
        this.userSettings = new Array();
        this.settingsModel = new settings_1.Settings();
    }
    IntroductionComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Introduction - Firm Simulator");
        this.getUserSettings();
    };
    IntroductionComponent.prototype.getUserSettings = function () {
        var _this = this;
        this.settingsService.getSettings()
            .subscribe(function (response) {
            var currentEmail = _this.usersService.getCurrentUser().email;
            for (var i = 0; i < response.length; i++) {
                if (response[i].userEmail === currentEmail)
                    _this.userSettings.push(response[i]);
            }
            for (var i = 0; i < _this.userSettings.length; i++) {
                if (_this.userSettings[i].description === "Defaults")
                    _this.settingsModel = _this.userSettings[i];
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    IntroductionComponent.prototype.onSelectChange = function (settingsDescription) {
        for (var i = 0; i < this.userSettings.length; i++) {
            if (this.userSettings[i].description === settingsDescription)
                this.settingsModel = this.userSettings[i];
        }
    };
    IntroductionComponent.prototype.beginSimulation = function () {
        this.simulationService.beginSimulation(this.settingsModel);
        this.router.navigate(["/simulation"]);
    };
    IntroductionComponent = __decorate([
        core_1.Component({
            selector: "sg-introduction",
            templateUrl: "app/introduction/introduction.component.html"
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title, router_1.Router, simulation_service_1.SimulationService, settings_service_1.SettingsService, users_service_1.UsersService])
    ], IntroductionComponent);
    return IntroductionComponent;
}());
exports.IntroductionComponent = IntroductionComponent;
//# sourceMappingURL=introduction.component.js.map