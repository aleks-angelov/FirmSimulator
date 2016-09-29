using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FirmSimulator.Models
{
    public class User
    {
        [Key]
        public string Email { get; set; }
        public string Name { get; set; }

        public List<Score> Scores { get; set; }
        public List<Settings> Settings { get; set; }
    }
}