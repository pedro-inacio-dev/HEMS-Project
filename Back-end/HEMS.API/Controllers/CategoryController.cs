using HEMS.Application.DTOs;
using HEMS.Application.UseCases.ManageCategory;
using HEMS.Application.UseCases.ManageCategory;
using HEMS.Shared.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace HEMS.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ManageCategory _manageCategory;

        public CategoryController(ManageCategory manageCategory)
        {
            _manageCategory = manageCategory;
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CategoryDTO categoryDTO)
        {
            await _manageCategory.CreateCategory(categoryDTO);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update([FromRoute] long id, [FromBody] CategoryDTO categoryDTO)
        {
            categoryDTO.Id = id;
            await _manageCategory.UpdateCategory(categoryDTO);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] long id)
        {
            await _manageCategory.DeleteCategory(id);
            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            List<CategoryDTO> result = await _manageCategory.GetAllCategory();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById([FromRoute] long id)
        {
            CategoryDTO result = await _manageCategory.GetCategoryById(id);
            return Ok(result);
        }

        [HttpGet("TotalByCategory")]
        public async Task<ActionResult<TotalByCategoryDTO>> GetTotalByCategory()
        {
            TotalByCategoryDTO result = await _manageCategory.GetTotalByCategory();
            return Ok(result);
        }
    }
}
