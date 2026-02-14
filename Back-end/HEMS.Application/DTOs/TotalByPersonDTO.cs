using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Application.DTOs
{
    public class TotalByPersonDTO
    {
        public List<ValueByPersonDTO> ValueByPersonDTOs;
        public int TotalPeople { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal TotalBalance { get; set; }
    }

    public class ValueByPersonDTO
    {
        public string IDPerson { get; set; }
        public string Name { get; set; }
        public decimal Revenue { get; set; }
        public decimal Expense { get; set; }
        public decimal Balance { get; set; }
    }
}
