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
var platform_browser_1 = require("@angular/platform-browser");
var SimulationComponent = (function () {
    function SimulationComponent(titleService) {
        this.titleService = titleService;
        this.currentTab = 1;
    }
    SimulationComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Simulation - Firm Simulator");
    };
    SimulationComponent.prototype.changeTab = function () {
        this.currentTab++;
        if (this.currentTab > 2)
            this.currentTab = 0;
    };
    SimulationComponent = __decorate([
        core_1.Component({
            selector: "sg-simulation",
            templateUrl: "app/simulation/simulation.component.html"
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title])
    ], SimulationComponent);
    return SimulationComponent;
}());
exports.SimulationComponent = SimulationComponent;
//# sourceMappingURL=simulation.component.js.map