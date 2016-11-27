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
        this.simulationRunning = true;
    };
    SimulationService.prototype.calculateQuarterlyValues = function () {
        this.quarterlyRevenue = this.revenueModel.calculateTotalRevenue(this.quarterlyQuantity);
        this.quarterlyCost = this.costModel.calculateTotalCost(this.quarterlyQuantity);
        this.quarterlyProfit = this.quarterlyRevenue - this.quarterlyCost - this.quarterlyResearch;
        this.totalProfit += this.quarterlyProfit;
    };
    SimulationService.prototype.calculateProfitMaximization = function (maxQ) {
        var minimumDifference = Infinity;
        var optimalQuantity = 0;
        for (var q = 0; q <= maxQ; q++) {
            var marginalDifference = Math.abs(this.revenueModel.calculateMarginalRevenue(q) -
                this.costModel.calculateMarginalCost(q));
            if (marginalDifference === 0) {
                optimalQuantity = q;
                break;
            }
            if (marginalDifference < minimumDifference) {
                optimalQuantity = q;
                minimumDifference = marginalDifference;
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
            var largeReductionCoefficient = 1.0 - quarterlyProfitMaximization / 8;
            var smallReductionCoefficient = 1.0 - quarterlyProfitMaximization / 12.5;
            this.revenueModel.a *= largeReductionCoefficient;
            this.revenueModel.b *= smallReductionCoefficient;
        }
        if (this.quarterlyResearch > 0.0) {
            this.researchEffectRoll = Math.random();
            var researchProfitRatio = this.quarterlyResearch / (this.totalProfit - this.quarterlyProfit);
            var largeBoostCoefficient = researchProfitRatio / 4;
            var smallBoostCoefficient = researchProfitRatio / 5;
            if (this.researchEffectRoll >= 0.66) {
                this.revenueModel.a *= 1.0 + largeBoostCoefficient;
                this.revenueModel.b *= 1.0 + smallBoostCoefficient;
            }
            else if (this.researchEffectRoll >= 0.33) {
                this.costModel.a *= 1.0 - largeBoostCoefficient / 2;
                this.costModel.c *= 1.0 - smallBoostCoefficient / 2;
            }
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
            if (this.researchEffectRoll < 0.33) {
                return "Your research yielded no results.";
            }
            else if (this.researchEffectRoll < 0.66) {
                return "Your research lowered your costs of production.";
            }
            else {
                return "Your research raised the quality of your product, increasing the demand for it.";
            }
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
        // this.scoreService.postScore(this.finalScore).subscribe();
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