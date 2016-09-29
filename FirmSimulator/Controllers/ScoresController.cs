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

        // GET: api/values
        [HttpGet]
        public IEnumerable<Score> Get()
        {
            return _context.Scores.Include(s => s.User);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Score Get(int id)
        {
            return _context.Scores.Include(s => s.User).First(s => s.ScoreId == id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] Score value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}