using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Shared.DTOs
{
    public class TotalByCategoryDTO
    {
        public List<ValueByCategoryDTO> ValueByCategoryDTOs { get; set; }
        public int TotalCategories { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal TotalExpense { get; set; }
        public decimal TotalBalance { get; set; }
    }

    public class ValueByCategoryDTO
    {
        public long IDCategory { get; set; }
        public string Description { get; set; }
        public decimal Revenue { get; set; }
        public decimal Expense { get; set; }
        public decimal Balance { get; set; }
    }
}
