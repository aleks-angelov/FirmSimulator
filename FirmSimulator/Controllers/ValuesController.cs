using System;
using System.Collections.Generic;
using FirmSimulator.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace FirmSimulator.Controllers
{
    // For seeding and testing purposes
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private readonly SimulatorContext _context;

        public ValuesController(SimulatorContext context)
        {
            _context = context;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            //_context.Users.Add(new User
            //{
            //    Email = "aia131@aubg.edu",
            //    Name = "Aleks Angelov"
            //});
            //_context.SaveChanges();

            //_context.Scores.Add(new Score
            //{
            //    Date = DateTime.Now,
            //    ProfitMaximization = 100.0,
            //    User = _context.Users.First(u => u.Email == "aia131@aubg.edu")
            //});
            //_context.SaveChanges();

            //_context.Settings.Add(new Settings
            //{
            //    Description = "Defaults",
            //    Revenue_a = -0.5,
            //    Revenue_b = 16.0,
            //    Cost_a = 1.0,
            //    Cost_b = -20.0,
            //    Cost_c = 216.0,
            //    User = _context.Users.First(u => u.Email == "aia131@aubg.edu")
            //});
            //_context.SaveChanges();

            return new[] { "Database seeding successfull." };
        }

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