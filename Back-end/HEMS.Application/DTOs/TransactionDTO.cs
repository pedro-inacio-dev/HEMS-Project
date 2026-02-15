using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Application.DTOs
{
    public class TransactionDTO
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public decimal Value { get; set; }
        public int Type { get; set; }
        public CategoryDTO Category { get; set; }
        public PersonDTO Person { get; set; }
    }
}
