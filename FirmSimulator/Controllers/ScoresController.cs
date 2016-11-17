using System;
using System.Collections.Generic;
using System.Linq;
using FirmSimulator.Models;
using Microsoft.AspNetCore.Mvc;

namespace FirmSimulator.Controllers
{
    [Route("api/[controller]")]
    public class ScoresController : Controller
    {
        private readonly SimulatorContext _context;

        public ScoresController(SimulatorContext context)
        {
            _context = context;
        }

        // GET: api/scores
        [HttpGet]
        public IEnumerable<Score> Get()
        {
            return _context.Scores.OrderByDescending(s => s.Date);
        }

        // POST api/scores
        [HttpPost]
        public void Post([FromBody] Score newScore)
        {
            TimeSpan duration = newScore.Date.Subtract(newScore.StartTime);
            newScore.Duration = duration.Minutes + (duration.Minutes == 1 ? " minute " : " minutes ");
            newScore.Duration += duration.Seconds + (duration.Seconds == 1 ? " second" : " seconds");

            _context.Scores.Add(newScore);
            _context.SaveChanges();
        }
    }
}