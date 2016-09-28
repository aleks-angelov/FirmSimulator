using System.Collections.Generic;

namespace FirmSimulator.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Name { get; set; }

        public List<Score> Scores { get; set; }
        public List<Settings> Settings { get; set; }
    }
}