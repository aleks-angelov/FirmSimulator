using System.Collections.Generic;
using System.Linq;
using FirmSimulator.Models;
using Microsoft.AspNetCore.Mvc;

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
            return _context.Settings.OrderBy(s => s.UserEmail).ThenBy(s => s.Description);
        }

        // POST api/settings
        [HttpPost]
        public bool Post([FromBody] Settings newSettings)
        {
            Settings existingSettings =
                _context.Settings.FirstOrDefault(
                    s => (s.UserEmail == newSettings.UserEmail) && (s.Description == newSettings.Description));

            if (existingSettings != null) return false;

            _context.Settings.Add(newSettings);
            _context.SaveChanges();

            return true;
        }
    }
}