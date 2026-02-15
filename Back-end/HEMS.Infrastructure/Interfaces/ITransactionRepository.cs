using HEMS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Infrastructure.Interfaces
{
    public interface ITransactionRepository
    {
        Task<Transaction> AddAsync(Transaction obj);
        Task<Transaction> UpdateAsync(Transaction obj);
        Task<Transaction> DeleteAsync(Transaction obj);
        Task<List<Transaction>> GetAllAsync();
        Task<Transaction?> GetByIdAsync(long id);
    }
}
