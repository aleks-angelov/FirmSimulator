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

        public double ProfitMaximization { get; set; }

        [ForeignKey("User")]
        public string UserEmail { get; set; }

        public User User { get; set; }
    }
}