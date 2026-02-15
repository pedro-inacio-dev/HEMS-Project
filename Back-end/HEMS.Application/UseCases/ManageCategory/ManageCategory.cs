using HEMS.Application.DTOs;
using HEMS.Domain.Entities;
using HEMS.Domain.Enums;
using HEMS.Infrastructure.Interfaces;
using HEMS.Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Application.UseCases.ManageCategory
{
    public class ManageCategory
    {
        private readonly ICategoryRepository _repository;

        public ManageCategory(ICategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task CreateCategory(CategoryDTO categoryDTO)
        {
            Category category = new Category(categoryDTO.Description, (TypePurpose)categoryDTO.Type);
            Category created = await _repository.AddAsync(category);
        }

        public async Task UpdateCategory(CategoryDTO categoryDTO)
        {
            if (categoryDTO.Id == 0)
            {
                throw new InvalidOperationException("objeto tem que ter id para ser atualizado");
            }
            Category category = new Category(categoryDTO.Description, (TypePurpose)categoryDTO.Type);
            category.Id = categoryDTO.Id;
            Category created = await _repository.UpdateAsync(category);
        }

        public async Task DeleteCategory(long id)
        {
            Category? obj = await _repository.GetByIdAsync(id);
            if (obj == null)
            {
                throw new Exception("objeto não foi encontrado no banco para deletar");
            }
            await _repository.DeleteAsync(obj);
        }

        public async Task<TotalByCategoryDTO> GetTotalByCategory()
        {
            List<ValueByCategoryDTO> obj = await _repository.GetValueByCategoryAsync();
            TotalByCategoryDTO objTotals = await _repository.GetTotalsByCategoryAsync();
            if (objTotals.TotalCategories == 0)
            {
                return new TotalByCategoryDTO();
            }
            objTotals.ValueByCategoryDTOs = obj;
            return objTotals;
        }

        public async Task<List<CategoryDTO>> GetAllCategory()
        {
            List<Category> obj = await _repository.GetAllAsync();
            if (obj.Count == 0)
            {
                return new List<CategoryDTO>();
            }
            return obj.Select(e => new CategoryDTO
            {
                Id = e.Id,
                Description = e.Description,
                Type = (int)e.TypePurpose,
            }
            ).ToList();
        }

        public async Task<CategoryDTO?> GetCategoryById(long id)
        {
            Category? obj = await _repository.GetByIdAsync(id);
            if (obj == null)
            {
                throw new Exception("objeto não foi encontrado no banco");
            }
            return new CategoryDTO
            {
                Id = obj.Id,
                Description = obj.Description,
                Type = (int)obj.TypePurpose,
            };
        }
    }
}
