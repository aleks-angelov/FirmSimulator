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
var simulation_models_1 = require("./simulation-models");
var score_1 = require("../scores/score");
var scores_service_1 = require("../scores/scores.service");
var SimulationService = (function () {
    function SimulationService(scoreService) {
        this.scoreService = scoreService;
        this.settingsDescription = null;
    }
    SimulationService.prototype.isSimulationRunning = function () {
        return this.settingsDescription != null;
    };
    SimulationService.prototype.beginSimulation = function (initialSettings) {
        this.settingsDescription = initialSettings.description;
        this.revenueModel = new simulation_models_1.Revenue(initialSettings.revenue_a, initialSettings.revenue_b);
        this.costModel = new simulation_models_1.Cost(initialSettings.cost_a, initialSettings.cost_b, initialSettings.cost_c);
        this.currentTurn = 1;
        this.finalScore = new score_1.Score();
        this.finalScore.startTime = new Date();
    };
    SimulationService.prototype.makeTurn = function () {
        if (this.currentTurn < 12) {
            this.indicatorTopPoints = [];
            this.indicatorTopPoints.push(5);
            this.indicatorTopPoints.push(4);
            this.indicatorTopPoints.push(3);
            this.indicatorTopPoints.push(2);
            this.indicatorTopPoints.push(1);
            this.indicatorBottomPoints = [];
            this.indicatorBottomPoints.push(5);
            this.indicatorBottomPoints.push(4);
            this.indicatorBottomPoints.push(3);
            this.indicatorBottomPoints.push(2);
            this.indicatorBottomPoints.push(1);
        }
        else {
            this.endSimulation();
        }
        this.currentTurn++;
    };
    SimulationService.prototype.endSimulation = function () {
        window.alert("Game Over!");
        this.finalScore.date = new Date();
        this.finalScore.settingsDescription = this.settingsDescription;
        this.finalScore.totalProfit = 200.0;
        this.finalScore.profitMaximization = 0.95;
        this.scoreService.postScore(this.finalScore).subscribe();
        this.settingsDescription = null;
    };
    SimulationService.prototype.leaveSimulation = function () {
        this.settingsDescription = null;
    };
    SimulationService.prototype.getCurrentTurn = function () {
        return this.currentTurn;
    };
    SimulationService.prototype.getRevenueModel = function () {
        return this.revenueModel;
    };
    SimulationService.prototype.getCostModel = function () {
        return this.costModel;
    };
    SimulationService.prototype.getIndicatorTopPoints = function () {
        return this.indicatorTopPoints;
    };
    SimulationService.prototype.getIndicatorBottomPoints = function () {
        return this.indicatorBottomPoints;
    };
    SimulationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [scores_service_1.ScoresService])
    ], SimulationService);
    return SimulationService;
}());
exports.SimulationService = SimulationService;
//# sourceMappingURL=simulation.service.js.map