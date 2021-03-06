﻿using System;
using System.Collections.Generic;
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

        private readonly Settings _defaultSettings;

        private readonly byte[] _hashSalt;

        public UsersController(SimulatorContext context)
        {
            _context = context;

            _defaultSettings = new Settings
            {
                Description = "Defaults",
                Revenue_a = -0.5,
                Revenue_b = 16,
                Cost_a = 1,
                Cost_b = -20,
                Cost_c = 204,
                UserEmail = ""
            };

            _hashSalt = Convert.FromBase64String("NZsP6NnmfBuYeJrrAKNuVQ==");
        }

        // POST api/users/login
        [HttpPost("login")]
        public UserViewModel Login([FromBody] LoginViewModel lvm)
        {
            User existingUser = _context.Users.Find(lvm.Email);
            UserViewModel uvm = new UserViewModel();
            if ((existingUser != null) && VerifyPassword(existingUser.PasswordHash, lvm.Password))
            {
                uvm.Email = existingUser.Email;
                uvm.Name = existingUser.Name;
            }

            return uvm;
        }

        // POST api/users/register
        [HttpPost("register")]
        public UserViewModel Register([FromBody] RegisterViewModel rvm)
        {
            User existingUser = _context.Users.Find(rvm.Email);
            UserViewModel uvm = new UserViewModel();
            if (existingUser == null)
            {
                User newUser = new User
                {
                    Email = rvm.Email,
                    Name = rvm.Name,
                    PasswordHash = HashPassword(rvm.Password),
                    Scores = new List<Score>(),
                    Settings = new List<Settings>()
                };

                _defaultSettings.UserEmail = rvm.Email;
                newUser.Settings.Add(_defaultSettings);

                _context.Users.Add(newUser);
                _context.SaveChanges();

                uvm.Email = newUser.Email;
                uvm.Name = newUser.Name;
            }

            return uvm;
        }

        private string HashPassword(string password)
        {
            return
                Convert.ToBase64String(KeyDerivation.Pbkdf2(password, _hashSalt, KeyDerivationPrf.HMACSHA1,
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
            byte[] derivedPasswordHash = KeyDerivation.Pbkdf2(password, _hashSalt, KeyDerivationPrf.HMACSHA1,
                HashIterationCount, HashNumBytesRequested);

            return ByteArraysEqual(decodedHashedPassword, derivedPasswordHash);
        }
    }
}