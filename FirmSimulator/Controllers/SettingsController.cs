﻿using System.Collections.Generic;
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
            return _context.Settings;
        }

        // GET api/settings/aia131@aubg.edu
        [HttpGet("{email}")]
        public IEnumerable<Settings> Get([FromQuery] string email)
        {
            return _context.Settings.Where(s => s.UserEmail == email);
        }

        // POST api/settings
        [HttpPost]
        public bool Post([FromBody] Settings newSettings)
        {
            _context.Settings.Add(newSettings);
            _context.SaveChanges();

            return true;
        }
    }
}