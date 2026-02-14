using HEMS.Application.DTOs;
using HEMS.Application.UseCases.ManageCategory;
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

        [HttpGet("TotalByCategory")]
        public async Task<ActionResult<TotalByCategoryDTO>> GetTotalByCategory()
        {
            var result = await _manageCategory.GetTotalByCategory();
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            return null;
        }

        [HttpPost]
        public async Task<ActionResult> Create()
        {
            return null;
        }
    }
}
