export class Revenue {
    // a < 0 && b > 0
    constructor(
        public a: number,
        public b: number) {
    }

    // Demand i.e. Price(P) = a*Q + b
    calculatePrice(Q: number): number {
        return this.a * Q + this.b;
    }

    // Total(TR) = P * Q = (a*Q + b) * Q = a*Q^2 + b*Q
    calculateTotalRevenue(Q: number): number {
        return this.calculatePrice(Q) * Q;
    }

    // Marginal(MR) = 2*a*Q + b
    calculateMarginalRevenue(Q: number): number {
        return 2 * this.a * Q + this.b;
    }
}

export class Cost {
    // a > 0 && b < 0 && c > 0
    constructor(
        public a: number,
        public b: number,
        public c: number) {
    }

    // Total(TC) = a*Q^2 + b*Q + c
    calculateTotalCost(Q: number): number {
        return this.a * Q * Q + this.b * Q + this.c;
    }

    // Average(AC) = TC / Q = a*Q + b + c/Q
    calculateAverageCost(Q: number): number {
        return Q !== 0 ? this.calculateTotalCost(Q) / Q : 0.0;
    }

    // Marginal(MC) = 2*a*Q + b
    calculateMarginalCost(Q: number): number {
        return 2 * this.a * Q + this.b;
    }
}
