using Microsoft.EntityFrameworkCore;

namespace FirmSimulator.Models
{
    public class SimulatorContext : DbContext
    {
        public SimulatorContext(DbContextOptions<SimulatorContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Score> Scores { get; set; }
        public DbSet<Settings> Settings { get; set; }
    }
}