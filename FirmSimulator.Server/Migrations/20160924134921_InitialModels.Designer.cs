using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using FirmSimulator.Server.Models;

namespace FirmSimulator.Server.Migrations
{
    [DbContext(typeof(SimulatorContext))]
    [Migration("20160924134921_InitialModels")]
    partial class InitialModels
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FirmSimulator.Server.Models.Score", b =>
                {
                    b.Property<int>("ScoreId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<double>("ProfitMaximization");

                    b.Property<int>("UserId");

                    b.HasKey("ScoreId");

                    b.HasIndex("UserId");

                    b.ToTable("Scores");
                });

            modelBuilder.Entity("FirmSimulator.Server.Models.Settings", b =>
                {
                    b.Property<int>("SettingsId")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Cost_a");

                    b.Property<double>("Cost_b");

                    b.Property<double>("Cost_c");

                    b.Property<string>("Description");

                    b.Property<double>("Revenue_a");

                    b.Property<double>("Revenue_b");

                    b.Property<int>("UserId");

                    b.HasKey("SettingsId");

                    b.HasIndex("UserId");

                    b.ToTable("Settings");
                });

            modelBuilder.Entity("FirmSimulator.Server.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("FirmSimulator.Server.Models.Score", b =>
                {
                    b.HasOne("FirmSimulator.Server.Models.User", "User")
                        .WithMany("Scores")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("FirmSimulator.Server.Models.Settings", b =>
                {
                    b.HasOne("FirmSimulator.Server.Models.User", "User")
                        .WithMany("Settings")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
