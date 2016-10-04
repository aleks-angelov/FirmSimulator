using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using FirmSimulator.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;

namespace FirmSimulator.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private const int HashIterationCount = 10000;
        private const int HashNumBytesRequested = 256/8;

        private readonly SimulatorContext _context;
        private readonly byte[] HashSalt;

        public UsersController(SimulatorContext context)
        {
            HashSalt = Convert.FromBase64String("NZsP6NnmfBuYeJrrAKNuVQ==");

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
        public void Register([FromBody] User newUser)
        {
            newUser.PasswordHash = HashPassword(newUser.PasswordHash);
            _context.Users.Add(newUser);

            _context.SaveChanges();
        }

        // POST api/users/login
        [HttpPost("login")]
        public string Login()
        {
            return "Login Successful!";
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
            return
                Convert.ToBase64String(KeyDerivation.Pbkdf2(password, HashSalt, KeyDerivationPrf.HMACSHA1,
                    HashIterationCount, HashNumBytesRequested));
        }

        [MethodImpl(MethodImplOptions.NoInlining | MethodImplOptions.NoOptimization)]
        private static bool ByteArraysEqual(byte[] a, byte[] b)
        {
            if ((a == null) && (b == null))
                return true;

            if ((a == null) || (b == null) || (a.Length != b.Length))
                return false;

            bool areSame = true;
            for (int i = 0; i < a.Length; i++)
                areSame &= a[i] == b[i];

            return areSame;
        }

        private bool VerifyPassword(string hashedPassword, string password)
        {
            byte[] decodedHashedPassword = Convert.FromBase64String(hashedPassword);
            byte[] derivedPasswordHash = KeyDerivation.Pbkdf2(password, HashSalt, KeyDerivationPrf.HMACSHA1,
                HashIterationCount, HashNumBytesRequested);

            return ByteArraysEqual(decodedHashedPassword, derivedPasswordHash);
        }
    }
}