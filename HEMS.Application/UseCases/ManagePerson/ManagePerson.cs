using HEMS.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Application.UseCases.ManagePerson
{
    public class ManagePerson
    {
        public Task<TotalByPersonDTO> GetTotalByPerson()
        {
            return Task.FromResult(new TotalByPersonDTO());
        }
    }
}
