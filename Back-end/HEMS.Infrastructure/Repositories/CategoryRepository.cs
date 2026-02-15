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
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _context;

        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Category> AddAsync(Category obj)
        {
            _context.Category.Add(obj);
            await _context.SaveChangesAsync();
            return obj;
        }

        public async Task<Category> UpdateAsync(Category obj)
        {
            _context.Category.Update(obj);
            await _context.SaveChangesAsync();
            return obj;
        }

        public async Task<Category> DeleteAsync(Category obj)
        {
            _context.Category.Remove(obj);
            await _context.SaveChangesAsync();
            return obj;
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await _context.Category.ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(long id)
        {
            return await _context.Category.FindAsync(id);
        }

        public async Task<List<ValueByCategoryDTO>> GetValueByCategoryAsync()
        {
            string sql = @"
                SELECT
                    p.""Id"" AS ""IDCategory"",
                    p.""Description"" AS ""Description"",
                    COUNT(CASE WHEN t.""TypePurpose"" = 1 THEN 1 END) AS ""Revenue"",
                    COUNT(CASE WHEN t.""TypePurpose"" = 0 THEN 1 END) AS ""Expense"",
                    COALESCE(SUM(CASE WHEN t.""TypePurpose"" = 1 THEN t.""Value"" ELSE 0 END), 0)
                    -
                    COALESCE(SUM(CASE WHEN t.""TypePurpose"" = 0 THEN t.""Value"" ELSE 0 END), 0) AS ""Balance""
                FROM ""Category"" p
                LEFT JOIN ""Transaction"" t ON t.""CategoryId"" = p.""Id""
                GROUP BY p.""Id"", p.""Description""
                ORDER BY p.""Description"";
            ";

            return await _context.ValueByCategory.FromSqlRaw(sql).ToListAsync();
        }

        public async Task<TotalByCategoryDTO> GetTotalsByCategoryAsync()
        {
            string sql = @"
                SELECT
                    COUNT(DISTINCT p.""Id"") AS ""TotalCategories"",
                    COALESCE(SUM(CASE WHEN t.""TypePurpose"" = 1 THEN t.""Value"" ELSE 0 END), 0) AS ""TotalRevenue"",
                    COALESCE(SUM(CASE WHEN t.""TypePurpose"" = 0 THEN t.""Value"" ELSE 0 END), 0) AS ""TotalExpense"",
                    COALESCE(SUM(CASE WHEN t.""TypePurpose"" = 1 THEN t.""Value"" ELSE 0 END), 0)
                    -
                    COALESCE(SUM(CASE WHEN t.""TypePurpose"" = 0 THEN t.""Value"" ELSE 0 END), 0) AS ""TotalBalance""
                FROM ""Category"" p
                LEFT JOIN ""Transaction"" t ON t.""CategoryId"" = p.""Id""
            ";

            return await _context.TotalByCategory.FromSqlRaw(sql).FirstOrDefaultAsync();
        }
    }
}
