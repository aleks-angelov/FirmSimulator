using System.Collections.Generic;
using System.Linq;
using FirmSimulator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FirmSimulator.Controllers
{
    [Route("api/[controller]")]
    public class SettingsController : Controller
    {
        private readonly SimulatorContext _context;

        public SettingsController(SimulatorContext context)
        {
            _context = context;
        }

        // GET: api/settings
        [HttpGet]
        public IEnumerable<Settings> Get()
        {
            return _context.Settings.Include(s => s.User);
        }

        // GET api/settings/5
        [HttpGet("{id}")]
        public Settings Get(int id)
        {
            return _context.Settings.Include(s => s.User).First(s => s.SettingsId == id);
        }

        // POST api/settings
        [HttpPost]
        public void Post([FromBody] Settings newSettings)
        {
            newSettings.User = _context.Users.First(u => u.Email == newSettings.UserEmail);
            _context.Settings.Add(newSettings);

            _context.SaveChanges();
        }

        // PUT api/settings/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Settings changedSettings)
        {
            Settings existingSettings = _context.Settings.First(s => s.SettingsId == id);
            existingSettings.Description = changedSettings.Description;
            existingSettings.Revenue_a = changedSettings.Revenue_a;
            existingSettings.Revenue_b = changedSettings.Revenue_b;
            existingSettings.Cost_a = changedSettings.Cost_a;
            existingSettings.Cost_b = changedSettings.Cost_b;
            existingSettings.Cost_c = changedSettings.Cost_c;

            _context.SaveChanges();
        }

        // DELETE api/settings/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Settings existingSettings = _context.Settings.First(s => s.SettingsId == id);
            _context.Settings.Remove(existingSettings);

            _context.SaveChanges();
        }
    }
}