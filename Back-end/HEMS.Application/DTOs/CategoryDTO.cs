using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Application.DTOs
{
    public class CategoryDTO
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public int Type { get; set; }
    }
}
