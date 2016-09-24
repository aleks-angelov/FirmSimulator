namespace FirmSimulator.Server.Models
{
    public class Revenue
    {
        public Revenue(double a, double b)
        {
            this.a = a;
            this.b = b;
        }

        // a < 0 && b > 0
        public double a { get; }
        public double b { get; }

        // Demand i.e. Price(P) = a*Q + b
        public double CalculatePrice(int Q)
        {
            return a*Q + b;
        }

        // Total(TR) = P * Q = (a*Q + b) * Q = a*Q^2 + b*Q
        public double CalculateTotalRevenue(int Q)
        {
            return CalculatePrice(Q)*Q;
        }

        // Marginal(MR) = (a/2)*Q + b
        public double CalculateMarginalRevenue(int Q)
        {
            return a/2*Q + b;
        }
    }
}