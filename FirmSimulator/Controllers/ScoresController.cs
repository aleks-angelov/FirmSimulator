using System.Collections.Generic;
using System.Linq;
using FirmSimulator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            return _context.Scores.Include(s => s.User);
        }

        // GET api/scores/5
        [HttpGet("{id}")]
        public Score Get(int id)
        {
            return _context.Scores.Include(s => s.User).First(s => s.ScoreId == id);
        }

        // POST api/scores
        [HttpPost]
        public void Post([FromBody] Score newScore)
        {
            newScore.User = _context.Users.First(u => u.Email == newScore.UserEmail);
            _context.Scores.Add(newScore);

            _context.SaveChanges();
        }
    }
}