namespace FirmSimulator.Server.Models
{
    public class Cost
    {
        // a > 0 && b < 0 && c > 0
        public double a { get; }
        public double b { get; }
        public double c { get; }

        public Cost(double a, double b, double c)
        {
            this.a = a;
            this.b = b;
            this.c = c;
        }

        // Total(TC) = a*Q^2 + b*Q + c
        public double CalculateTotalCost(int Q)
        {
            return a * Q * Q + b * Q + c;
        }

        // Average(AC) = TC / Q = a*Q + b + c/Q
        public double CalculateAverageCost(int Q)
        {
            return CalculateTotalCost(Q) / Q;
        }

        // Marginal(MC) = 2*a*Q + b
        public double CalculateMarginalCost(int Q)
        {
            return 2 * a * Q + b;
        }
    }
}
