using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FirmSimulator.Models
{
    public class User
    {
        [Key]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public List<Score> Scores { get; set; }
        public List<Settings> Settings { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class RegisterViewModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }
    }

    public class UserViewModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }
    }
}