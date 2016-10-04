using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using FirmSimulator.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace FirmSimulator.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly SimulatorContext _context;

        public UsersController(SimulatorContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _context.Users;
        }

        // GET api/users/example@email.com
        [HttpGet("{id}")]
        public User Get(string id)
        {
            return _context.Users.First(u => u.Email == id);
        }

        // POST api/users
        [HttpPost]
        public void Post([FromBody] User newUser)
        {
            newUser.PasswordHash = HashPassword(newUser.PasswordHash);
            _context.Users.Add(newUser);

            _context.SaveChanges();
        }

        // PUT api/users/example@email.com
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] User changedUser)
        {
            User existingUser = _context.Users.First(u => u.Email == id);
            existingUser.Email = changedUser.Email;
            existingUser.Name = changedUser.Name;

            _context.SaveChanges();
        }

        private string HashPassword(string password)
        {
            // generate a 128-bit salt using a secure PRNG
            byte[] salt = new byte[128 / 8];
            using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password,
                salt,
                KeyDerivationPrf.HMACSHA1,
                10000,
                256 / 8));
        }
    }
}
