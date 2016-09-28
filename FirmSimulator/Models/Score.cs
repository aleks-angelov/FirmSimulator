using System;

namespace FirmSimulator.Models
{
    public class Score
    {
        public int ScoreId { get; set; }
        public DateTime Date { get; set; }
        public double ProfitMaximization { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}