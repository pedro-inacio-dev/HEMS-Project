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
        public long Id { get; set; }
        public string Description { get; set; }
        public TypePurpose TypePurpose { get; set; }

        private Category() { }

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
