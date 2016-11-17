using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FirmSimulator.Models
{
    public class Score
    {
        [Key]
        public int ScoreId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [NotMapped]
        public DateTime StartTime { get; set; }

        [Required]
        public string SettingsDescription { get; set; }

        public string Duration { get; set; }

        public double TotalProfit { get; set; }

        public double ProfitMaximization { get; set; }

        [ForeignKey("User")]
        public string UserEmail { get; set; }
    }
}