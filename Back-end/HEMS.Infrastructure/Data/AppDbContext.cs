using HEMS.Domain.Entities;
using HEMS.Shared.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Person> Person => Set<Person>();
        public DbSet<Category> Category => Set<Category>();
        public DbSet<Transaction> Transaction => Set<Transaction>();

        public DbSet<TotalByPersonDTO> TotalByPerson { get; set; } = null!;
        public DbSet<ValueByPersonDTO> ValueByPerson { get; set; } = null!;

        public DbSet<TotalByCategoryDTO> TotalByCategory { get; set; } = null!;
        public DbSet<ValueByCategoryDTO> ValueByCategory { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TotalByPersonDTO>().HasNoKey().ToView(null);
            modelBuilder.Entity<ValueByPersonDTO>().HasNoKey().ToView(null);

            modelBuilder.Entity<TotalByCategoryDTO>().HasNoKey().ToView(null);
            modelBuilder.Entity<ValueByCategoryDTO>().HasNoKey().ToView(null);

            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }
    }
}
