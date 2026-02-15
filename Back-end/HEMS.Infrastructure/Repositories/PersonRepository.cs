using HEMS.Domain.Entities;
using HEMS.Infrastructure.Data;
using HEMS.Infrastructure.Interfaces;
using HEMS.Shared.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Infrastructure.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly AppDbContext _context;

        public PersonRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Person> AddAsync(Person person)
        {
            _context.Person.Add(person);
            await _context.SaveChangesAsync();
            return person;
        }

        public async Task<Person> UpdateAsync(Person person)
        {
            _context.Person.Update(person);
            await _context.SaveChangesAsync();
            return person;
        }

        public async Task<Person> DeleteAsync(Person person)
        {
            _context.Person.Remove(person);
            await _context.SaveChangesAsync();
            return person;
        }

        public async Task<List<Person>> GetAllAsync()
        {
            return await _context.Person.ToListAsync();
        }

        public async Task<Person?> GetByIdAsync(long id)
        {
            return await _context.Person.FindAsync(id);
        }

        public async Task<List<ValueByPersonDTO>> GetValueByPersonAsync()
        {
            string sql = @"
                SELECT
                    p.""Id"" AS ""IDPerson"",
                    p.""Name"" AS ""Name"",
                    COALESCE(SUM(CASE WHEN t.""TypePurpose"" = 2 THEN t.""Value"" ELSE 0 END), 0) AS ""Revenue"",
                    COALESCE(SUM(CASE WHEN t.""TypePurpose"" = 1 THEN t.""Value"" ELSE 0 END), 0) AS ""Expense"",
                    COALESCE(SUM(CASE WHEN t.""TypePurpose"" = 2 THEN t.""Value"" ELSE 0 END), 0)
                    -
                    COALESCE(SUM(CASE WHEN t.""TypePurpose"" = 1 THEN t.""Value"" ELSE 0 END), 0) AS ""Balance""
                FROM ""Person"" p
                LEFT JOIN ""Transaction"" t ON t.""PersonId"" = p.""Id""
                GROUP BY p.""Id"", p.""Name""
                ORDER BY p.""Name"";
            ";

            return await _context.ValueByPerson.FromSqlRaw(sql).ToListAsync();
        }

        public async Task<TotalByPersonDTO> GetTotalsByPersonAsync()
        {
            string sql = @"
                SELECT
                    COUNT(DISTINCT p.""Id"") AS ""TotalPeople"",
                    COALESCE(SUM(CASE WHEN t.""TypePurpose"" = 2 THEN t.""Value"" ELSE 0 END), 0) AS ""TotalRevenue"",
                    COALESCE(SUM(CASE WHEN t.""TypePurpose"" = 1 THEN t.""Value"" ELSE 0 END), 0) AS ""TotalExpense"",
                    COALESCE(SUM(CASE WHEN t.""TypePurpose"" = 2 THEN t.""Value"" ELSE 0 END), 0)
                    -
                    COALESCE(SUM(CASE WHEN t.""TypePurpose"" = 1 THEN t.""Value"" ELSE 0 END), 0) AS ""TotalBalance""
                FROM ""Person"" p
                LEFT JOIN ""Transaction"" t ON t.""PersonId"" = p.""Id""
            ";

            return await _context.TotalByPerson.FromSqlRaw(sql).FirstOrDefaultAsync();
        }
    }
}
