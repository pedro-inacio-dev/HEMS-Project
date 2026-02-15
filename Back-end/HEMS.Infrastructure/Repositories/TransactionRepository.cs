using HEMS.Domain.Entities;
using HEMS.Infrastructure.Data;
using HEMS.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Infrastructure.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly AppDbContext _context;

        public TransactionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Transaction> AddAsync(Transaction obj)
        {
            _context.Transaction.Add(obj);
            await _context.SaveChangesAsync();
            return obj;
        }

        public async Task<Transaction> UpdateAsync(Transaction obj)
        {
            _context.Transaction.Update(obj);
            await _context.SaveChangesAsync();
            return obj;
        }

        public async Task<Transaction> DeleteAsync(Transaction obj)
        {
            _context.Transaction.Remove(obj);
            await _context.SaveChangesAsync();
            return obj;
        }

        public async Task<List<Transaction>> GetAllAsync()
        {
            return await _context.Transaction.ToListAsync();
        }

        public async Task<Transaction?> GetByIdAsync(long id)
        {
            return await _context.Transaction.FindAsync(id);
        }
    }
}
