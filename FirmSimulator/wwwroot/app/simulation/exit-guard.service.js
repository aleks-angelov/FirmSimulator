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
var simulation_service_1 = require("./simulation.service");
var ExitGuard = (function () {
    function ExitGuard(simulationService) {
        this.simulationService = simulationService;
    }
    ExitGuard.prototype.canDeactivate = function (component, route, state) {
        if (this.simulationService.isSimulationRunning()) {
            if (window.confirm("If you leave the game before you complete it, you will lose your progress!")) {
                this.simulationService.leaveSimulation();
                return true;
            }
            return false;
        }
        return true;
    };
    ExitGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [simulation_service_1.SimulationService])
    ], ExitGuard);
    return ExitGuard;
}());
exports.ExitGuard = ExitGuard;
//# sourceMappingURL=exit-guard.service.js.map