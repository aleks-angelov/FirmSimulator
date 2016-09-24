using System.Collections.Generic;
using FirmSimulator.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace FirmSimulator.Server.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new[] { "Hello", "World" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            Revenue testRevenue = new Revenue(-2, 32);
            Cost testCost = new Cost(1, -20, 216);

            double tr = testRevenue.CalculateTotalRevenue(id);
            double tc = testCost.CalculateTotalCost(id);
            double profit = tr - tc;

            return $"Total Revenue: {tr}\nTotal Cost: {tc}\nProfit: {profit}";
        }
    }
}