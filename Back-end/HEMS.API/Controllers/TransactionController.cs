using HEMS.Application.DTOs;
using HEMS.Application.UseCases.ManageTransaction;
using HEMS.Application.UseCases.ManageTransaction;
using HEMS.Shared.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HEMS.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ManageTransaction _manageTransaction;

        public TransactionController(ManageTransaction manageTransaction)
        {
            _manageTransaction = manageTransaction;
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] TransactionDTO transactionDTO)
        {
            await _manageTransaction.CreateTransaction(transactionDTO);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update([FromRoute] long id, [FromBody] TransactionDTO transactionDTO)
        {
            transactionDTO.Id = id;
            await _manageTransaction.UpdateTransaction(transactionDTO);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] long id)
        {
            await _manageTransaction.DeleteTransaction(id);
            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            List<TransactionDTO> result = await _manageTransaction.GetAllTransaction();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById([FromRoute] long id)
        {
            TransactionDTO result = await _manageTransaction.GetTransactionById(id);
            return Ok(result);
        }
    }
}
