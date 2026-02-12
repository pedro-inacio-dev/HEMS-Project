using HEMS.Application.DTOs;
using HEMS.Application.UseCases.ManagePerson;
using Microsoft.AspNetCore.Mvc;

namespace HEMS.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly ManagePerson _managePerson;

        public PersonController(ManagePerson managePerson)
        {
            _managePerson = managePerson;
        }

        [HttpGet("TotalByPerson")]
        public async Task<ActionResult<TotalByPersonDTO>> GetTotalByPerson()
        {
            TotalByPersonDTO result = await _managePerson.GetTotalByPerson();
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

        [HttpPut]
        public async Task<ActionResult> Update()
        {
            return null;
        }

        [HttpDelete]
        public async Task<IActionResult> Delete()
        {
            return NoContent();
        }
    }
}
