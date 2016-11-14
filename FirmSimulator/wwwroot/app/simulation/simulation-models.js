"use strict";
var Revenue = (function () {
    // a < 0 && b > 0
    function Revenue(a, b) {
        this.a = a;
        this.b = b;
    }
    // Demand i.e. Price(P) = a*Q + b
    Revenue.prototype.calculatePrice = function (Q) {
        return this.a * Q + this.b;
    };
    // Total(TR) = P * Q = (a*Q + b) * Q = a*Q^2 + b*Q
    Revenue.prototype.calculateTotalRevenue = function (Q) {
        return this.calculatePrice(Q) * Q;
    };
    // Marginal(MR) = 2*a*Q + b
    Revenue.prototype.calculateMarginalRevenue = function (Q) {
        return 2 * this.a * Q + this.b;
    };
    return Revenue;
}());
exports.Revenue = Revenue;
var Cost = (function () {
    // a > 0 && b < 0 && c > 0
    function Cost(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    // Total(TC) = a*Q^2 + b*Q + c
    Cost.prototype.calculateTotalCost = function (Q) {
        return this.a * Q * Q + this.b * Q + this.c;
    };
    // Average(AC) = TC / Q = a*Q + b + c/Q
    Cost.prototype.calculateAverageCost = function (Q) {
        return this.calculateTotalCost(Q) / Q;
    };
    // Marginal(MC) = 2*a*Q + b
    Cost.prototype.calculateMarginalCost = function (Q) {
        return 2 * this.a * Q + this.b;
    };
    return Cost;
}());
exports.Cost = Cost;
//# sourceMappingURL=simulation-models.js.map