using HEMS.Domain.Entities;
using HEMS.Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Infrastructure.Interfaces
{
    public interface IPersonRepository
    {
        Task<Person> AddAsync(Person obj);
        Task<Person> UpdateAsync(Person obj);
        Task<Person> DeleteAsync(Person obj);
        Task<List<Person>> GetAllAsync();
        Task<Person?> GetByIdAsync(long id);
        Task<List<ValueByPersonDTO>> GetValueByPersonAsync();
        Task<TotalByPersonDTO> GetTotalsByPersonAsync();
    }
}
