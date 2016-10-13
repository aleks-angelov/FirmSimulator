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
            return _context.Scores;
        }

        // GET api/scores/aia131@aubg.edu
        [HttpGet("{email}")]
        public IEnumerable<Score> Get(string email)
        {
            return _context.Scores.Where(s => s.UserEmail == email);
        }

        // POST api/scores
        [HttpPost]
        public void Post([FromBody] Score newScore)
        {
            _context.Scores.Add(newScore);
            _context.SaveChanges();
        }
    }
}