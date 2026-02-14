using HEMS.Application.UseCases.ManageTransaction;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HEMS.API.Controllers
{
    public class TransactionController : ControllerBase
    {
        private readonly ManageTransaction _manageTransaction;

        public TransactionController(ManageTransaction manageTransaction)
        {
            _manageTransaction = manageTransaction;
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
