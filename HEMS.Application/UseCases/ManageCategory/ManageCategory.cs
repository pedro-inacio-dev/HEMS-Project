using HEMS.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Application.UseCases.ManageCategory
{
    public class ManageCategory
    {
        public Task<TotalByCategoryDTO> GetTotalByCategory()
        {
            return Task.FromResult(new TotalByCategoryDTO());
        }
    }
}
