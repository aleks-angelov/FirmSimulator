using System.Collections.Generic;
using System.Linq;
using FirmSimulator.Models;
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

        // DELETE api/users/example@email.com
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            User existingUser = _context.Users.First(u => u.Email == id);
            _context.Users.Remove(existingUser);

            _context.SaveChanges();
        }
    }
}
