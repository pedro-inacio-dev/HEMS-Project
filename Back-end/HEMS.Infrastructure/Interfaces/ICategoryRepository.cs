using HEMS.Domain.Entities;
using HEMS.Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Infrastructure.Interfaces
{
    public interface ICategoryRepository
    {
        Task<Category> AddAsync(Category obj);
        Task<Category> UpdateAsync(Category obj);
        Task<Category> DeleteAsync(Category obj);
        Task<List<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(long id);
        Task<List<ValueByCategoryDTO>> GetValueByCategoryAsync();
        Task<TotalByCategoryDTO> GetTotalsByCategoryAsync();
    }
}
