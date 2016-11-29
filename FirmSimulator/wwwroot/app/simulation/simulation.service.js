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
        this.simulationRunning = false;
    }
    SimulationService.prototype.beginSimulation = function (initialSettings) {
        this.finalScore = new score_1.Score();
        this.finalScore.startTime = new Date();
        this.finalScore.settingsDescription = initialSettings.description;
        this.finalScore.userEmail = initialSettings.userEmail;
        this.revenueModel = new simulation_models_1.Revenue(initialSettings.revenue_a, initialSettings.revenue_b);
        this.costModel = new simulation_models_1.Cost(initialSettings.cost_a, initialSettings.cost_b, initialSettings.cost_c);
        this.currentTurn = 1;
        this.totalProfit = 100.0;
        this.maximumTotalProfit = 100.0;
        this.profitMaximization = 1;
        this.researchEffects = [2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0];
        this.simulationRunning = true;
    };
    SimulationService.prototype.calculateQuarterlyValues = function () {
        this.quarterlyRevenue = this.revenueModel.calculateTotalRevenue(this.quarterlyQuantity);
        this.quarterlyCost = this.costModel.calculateTotalCost(this.quarterlyQuantity);
        this.quarterlyProfit = this.quarterlyRevenue - this.quarterlyCost - this.quarterlyResearch;
        this.totalProfit += this.quarterlyProfit;
    };
    SimulationService.prototype.calculateProfitMaximization = function (maxQ) {
        var optimalQuantity = 0;
        for (var q = 0; q <= maxQ; q++) {
            var marginalDifference = this.revenueModel.calculateMarginalRevenue(q) -
                this.costModel.calculateMarginalCost(q);
            if (marginalDifference < 0.0) {
                optimalQuantity = q - 1;
                break;
            }
        }
        this.maximumQuarterlyProfit = this.revenueModel.calculateTotalRevenue(optimalQuantity) -
            this.costModel.calculateTotalCost(optimalQuantity) -
            this.quarterlyResearch;
        this.maximumTotalProfit += this.maximumQuarterlyProfit;
        this.profitMaximization = this.maximumTotalProfit !== 0 ? this.totalProfit / this.maximumTotalProfit : 1.0;
    };
    SimulationService.prototype.adjustEconomicModels = function () {
        if (this.quarterlyProfit > 0.0) {
            var quarterlyProfitMaximization = this.quarterlyProfit / this.maximumQuarterlyProfit;
            var largeReductionCoefficient = 1.0 - quarterlyProfitMaximization / 4.0;
            var smallReductionCoefficient = 1.0 - quarterlyProfitMaximization / 6.0;
            this.revenueModel.a *= largeReductionCoefficient;
            this.revenueModel.b *= smallReductionCoefficient;
        }
        if (this.quarterlyResearch > 0.0) {
            var researchIndex = Math.floor(Math.random() * this.researchEffects.length);
            this.researchRoll = this.researchEffects[researchIndex];
            var researchProfitRatio = this.quarterlyResearch / (this.totalProfit - this.quarterlyProfit);
            if (this.researchRoll === 1) {
                var reductionCoefficient = 1.0 - researchProfitRatio / 12.5;
                this.costModel.a *= reductionCoefficient;
                this.costModel.c *= reductionCoefficient;
            }
            else if (this.researchRoll === 2) {
                var largeBoostCoefficient = 1.0 + researchProfitRatio / 2.0;
                var smallBoostCoefficient = 1.0 + researchProfitRatio / 3.0;
                this.revenueModel.a *= largeBoostCoefficient;
                this.revenueModel.b *= smallBoostCoefficient;
            }
            this.researchEffects[researchIndex] = this.researchEffects[this.researchEffects.length - 1];
            this.researchEffects[this.researchEffects.length - 1] = this.researchRoll;
            this.researchEffects.pop();
        }
    };
    SimulationService.prototype.describeProfitEffect = function () {
        if (this.currentTurn === 13) {
            return "";
        }
        if (this.quarterlyProfit > 0.0) {
            return "Your positive profit attracted new firms to the market, decreasing the demand for your product.";
        }
        return "";
    };
    SimulationService.prototype.describeResearchEffect = function () {
        if (this.currentTurn === 13) {
            return "";
        }
        if (this.quarterlyResearch > 0.0) {
            if (this.researchRoll === 1) {
                return "Your research lowered your cost of production.";
            }
            else if (this.researchRoll === 2) {
                return "Your research raised the quality of your product, increasing the demand for it.";
            }
            return "Your research yielded no results.";
        }
        return "";
    };
    SimulationService.prototype.makeTurn = function (quantity, maximumQuantity, research) {
        this.quarterlyQuantity = quantity;
        this.quarterlyResearch = research;
        this.calculateQuarterlyValues();
        this.calculateProfitMaximization(maximumQuantity);
        this.adjustEconomicModels();
        if (this.currentTurn === 12) {
            this.endSimulation();
        }
        this.currentTurn++;
    };
    SimulationService.prototype.calculateDuration = function () {
        var durationMiliseconds = this.finalScore.date.valueOf() - this.finalScore.startTime.valueOf();
        var durationMinutes = Math.floor(durationMiliseconds / 60000);
        var durationSeconds = Math.floor((durationMiliseconds % 60000) / 1000);
        var duration = durationMinutes + (durationMinutes === 1 ? " minute " : " minutes ");
        duration += durationSeconds + (durationSeconds === 1 ? " second" : " seconds");
        return duration;
    };
    SimulationService.prototype.endSimulation = function () {
        this.finalScore.date = new Date();
        this.finalScore.duration = this.calculateDuration();
        this.finalScore.totalProfit = this.totalProfit;
        this.finalScore.profitMaximization = this.profitMaximization;
        this.scoreService.postScore(this.finalScore).subscribe();
        this.simulationRunning = false;
    };
    SimulationService.prototype.leaveSimulation = function () {
        this.simulationRunning = false;
    };
    SimulationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [scores_service_1.ScoresService])
    ], SimulationService);
    return SimulationService;
}());
exports.SimulationService = SimulationService;
//# sourceMappingURL=simulation.service.js.map