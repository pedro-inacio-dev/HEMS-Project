using HEMS.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Domain.Entities
{
    public class Transaction
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public decimal Value { get; set; }
        public TypePurpose TypePurpose { get; set; }

        public long CategoryId { get; set; }
        public long PersonId { get; set; }

        public virtual Category? Category { get; set; }
        public virtual Person? Person { get; set; }

        private Transaction() { }

        public Transaction(
            string description,
            decimal value,
            TypePurpose typePurpose,
            long categoryId,
            long personId
            ) {
            if (value < 0)
            {
                throw new InvalidOperationException("O Valor não pode ser negativo");
            }
            if (description.Length > 400)
            {
                throw new InvalidOperationException("A descrição não pode ter mais que 400 caracteres");
            }
            if (!typePurpose.Equals(TypePurpose.Despesa) && !typePurpose.Equals(TypePurpose.Receita))
            {
                throw new InvalidOperationException("Transação deve ser do tipo Receita ou Despesa");
            }
            Description = description;
            Value = value;
            TypePurpose = typePurpose;
            CategoryId = categoryId;
            PersonId = personId;
        }
    }
}
