using FirmSimulator.Models;
using Microsoft.AspNetCore.Mvc;

namespace FirmSimulator.Controllers
{
    // For seeding and testing purposes
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            Revenue testRevenue = new Revenue(-0.5, 16);
            Cost testCost = new Cost(1, -20, 216);

            double price = testRevenue.CalculatePrice(id);
            double tr = testRevenue.CalculateTotalRevenue(id);
            double mr = testRevenue.CalculateMarginalRevenue(id);
            double tc = testCost.CalculateTotalCost(id);
            double ac = testCost.CalculateAverageCost(id);
            double mc = testCost.CalculateMarginalCost(id);
            double profit = tr - tc;

            return
                $"Price: {price:C}\nTotal Revenue: {tr:C}\nMarginal Revenue: {mr:C}\n\nTotal Cost: {tc:C}\nAverage Cost: {ac:C}\nMarginal Cost: {mc:C}\n\nProfit: {profit:C}";
        }
    }
}