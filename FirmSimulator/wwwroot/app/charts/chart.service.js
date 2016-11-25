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
var simulation_service_1 = require("../simulation/simulation.service");
var ChartService = (function () {
    function ChartService(simulationService) {
        this.simulationService = simulationService;
    }
    ChartService.prototype.getMaxPrice = function () {
        return Math.round(this.simulationService.revenueModel.calculatePrice(0)) + 1;
    };
    ChartService.prototype.getPriceData = function () {
        var revenueModel = this.simulationService.revenueModel;
        var data = [];
        var q = 0;
        var p = parseFloat(revenueModel.calculatePrice(0).toFixed(2));
        while (p >= 0) {
            data.push({ x: q, y: p });
            q++;
            p = parseFloat(revenueModel.calculatePrice(q).toFixed(2));
        }
        this.maxQ = q - 1;
        return data;
    };
    ChartService.prototype.getQuarterlyPrice = function () {
        return this.simulationService.revenueModel.calculatePrice(this.simulationService.quarterlyQuantity);
    };
    ChartService.prototype.getAverageCostData = function () {
        var costModel = this.simulationService.costModel;
        var data = [];
        for (var i = 1; i < this.maxQ; i++)
            data.push({ x: i, y: parseFloat(costModel.calculateAverageCost(i).toFixed(2)) });
        return data;
    };
    ChartService.prototype.getQuarterlyAverageCost = function () {
        return this.simulationService.costModel.calculateAverageCost(this.simulationService.quarterlyQuantity);
    };
    ChartService.prototype.getMarginalRevenueData = function () {
        var revenueModel = this.simulationService.revenueModel;
        var data = [];
        for (var i = 0; i < this.maxQ; i++)
            data.push({ x: i, y: parseFloat(revenueModel.calculateMarginalRevenue(i).toFixed(2)) });
        return data;
    };
    ChartService.prototype.getQuarterlyMarginalRevenue = function () {
        return this.simulationService.revenueModel.calculateMarginalRevenue(this.simulationService.quarterlyQuantity);
    };
    ChartService.prototype.getMarginalCostData = function () {
        var costModel = this.simulationService.costModel;
        var data = [];
        for (var i = 0; i < this.maxQ; i++)
            data.push({ x: i, y: parseFloat(costModel.calculateMarginalCost(i).toFixed(2)) });
        return data;
    };
    ChartService.prototype.getQuarterlyMarginalCost = function () {
        return this.simulationService.costModel.calculateMarginalCost(this.simulationService.quarterlyQuantity);
    };
    ChartService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [simulation_service_1.SimulationService])
    ], ChartService);
    return ChartService;
}());
exports.ChartService = ChartService;
//# sourceMappingURL=chart.service.js.map