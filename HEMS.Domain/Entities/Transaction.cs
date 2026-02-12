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
        public long IdTransaction { get; set; }
        public required string Description { get; set; }
        public decimal Value { get; set; }
        public TypePurpose TypePurpose { get; set; }
        public Category Category { get; set; }
        public Person Person { get; set; }

        public Transaction(
            string description,
            decimal value,
            TypePurpose typePurpose,
            Category category,
            Person person
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
            if (!category.TypePurpose.Equals(TypePurpose.Ambos) && !category.TypePurpose.Equals(typePurpose))
            {
                throw new InvalidOperationException("Transação deve ser do mesmo tipo da Categoria escolhida");
            }
            Description = description;
            Value = value;
            TypePurpose = typePurpose;
            Category = category;
            Person = person;
        }
    }
}
