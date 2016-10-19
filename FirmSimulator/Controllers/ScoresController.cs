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
        public bool Post([FromBody] Score newScore)
        {
            _context.Scores.Add(newScore);
            _context.SaveChanges();

            return true;
        }
    }
}