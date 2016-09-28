namespace FirmSimulator.Models
{
    public class Settings
    {
        public int SettingsId { get; set; }
        public string Description { get; set; }

        public double Revenue_a { get; set; }
        public double Revenue_b { get; set; }
        public double Cost_a { get; set; }
        public double Cost_b { get; set; }
        public double Cost_c { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}