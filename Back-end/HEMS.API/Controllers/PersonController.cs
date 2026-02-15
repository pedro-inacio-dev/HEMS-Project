using HEMS.Application.DTOs;
using HEMS.Application.UseCases.ManagePerson;
using HEMS.Shared.DTOs;
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

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] PersonDTO personDTO)
        {
            await _managePerson.CreatePerson(personDTO);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update([FromRoute] long id, [FromBody] PersonDTO personDTO)
        {
            personDTO.Id = id;
            await _managePerson.UpdatePerson(personDTO);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] long id)
        {
            await _managePerson.DeletePerson(id);
            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            List<PersonDTO> result = await _managePerson.GetAllPerson();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById([FromRoute] long id)
        {
            PersonDTO result = await _managePerson.GetPersonById(id);
            return Ok(result);
        }

        [HttpGet("TotalByPerson")]
        public async Task<ActionResult<TotalByPersonDTO>> GetTotalByPerson()
        {
            TotalByPersonDTO result = await _managePerson.GetTotalByPerson();
            return Ok(result);
        }
    }
}
