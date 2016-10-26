using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using FirmSimulator.Models;

namespace FirmSimulator.Migrations
{
    [DbContext(typeof(SimulatorContext))]
    [Migration("20161026163129_ChangedScoresAgain")]
    partial class ChangedScoresAgain
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FirmSimulator.Models.Score", b =>
                {
                    b.Property<int>("ScoreId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<double>("ProfitMaximization");

                    b.Property<string>("SettingsDescription")
                        .IsRequired();

                    b.Property<double>("TotalProfit");

                    b.Property<string>("UserEmail");

                    b.HasKey("ScoreId");

                    b.HasIndex("UserEmail");

                    b.ToTable("Scores");
                });

            modelBuilder.Entity("FirmSimulator.Models.Settings", b =>
                {
                    b.Property<int>("SettingsId")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Cost_a");

                    b.Property<double>("Cost_b");

                    b.Property<double>("Cost_c");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<double>("Revenue_a");

                    b.Property<double>("Revenue_b");

                    b.Property<string>("UserEmail");

                    b.HasKey("SettingsId");

                    b.HasIndex("UserEmail");

                    b.ToTable("Settings");
                });

            modelBuilder.Entity("FirmSimulator.Models.User", b =>
                {
                    b.Property<string>("Email");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("PasswordHash")
                        .IsRequired();

                    b.HasKey("Email");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("FirmSimulator.Models.Score", b =>
                {
                    b.HasOne("FirmSimulator.Models.User")
                        .WithMany("Scores")
                        .HasForeignKey("UserEmail");
                });

            modelBuilder.Entity("FirmSimulator.Models.Settings", b =>
                {
                    b.HasOne("FirmSimulator.Models.User")
                        .WithMany("Settings")
                        .HasForeignKey("UserEmail");
                });
        }
    }
}
