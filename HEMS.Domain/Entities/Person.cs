using HEMS.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Domain.Entities
{
    public class Person
    {
        public long IdPerson  { get; set; }
        public required string Name { get; set; }
        public int Age { get; set; }

        public Person(
            string name,
            int age
            )
        {
            if (name.Length > 200)
            {
                throw new InvalidOperationException("O nome não pode ter mais que 200 caracteres");
            }
            Name = name;
            Age = age;
        }
    }
}
