using HEMS.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Domain.Entities
{
    public class Category
    {
        public long IdCategory { get; set; }
        public required string Description { get; set; }
        public required TypePurpose TypePurpose { get; set; } //Finalidade

        public Category(
            string description,
            TypePurpose typePurpose
            )
        {
            if (description.Length > 400)
            {
                throw new InvalidOperationException("A descrição não pode ter mais que 400 caracteres");
            }
            Description = description;
            TypePurpose = typePurpose;
        }
    }
}
