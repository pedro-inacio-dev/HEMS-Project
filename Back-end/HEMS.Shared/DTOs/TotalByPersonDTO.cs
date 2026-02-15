using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Shared.DTOs
{
    public class TotalByPersonDTO
    {
        public List<ValueByPersonDTO> ValueByPersonDTOs;
        public int TotalPeople { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal TotalExpense { get; set; }
        public decimal TotalBalance { get; set; }
    }

    public class ValueByPersonDTO
    {
        public long IDPerson { get; set; }
        public string Name { get; set; }
        public decimal Revenue { get; set; }
        public decimal Expense { get; set; }
        public decimal Balance { get; set; }
    }
}
