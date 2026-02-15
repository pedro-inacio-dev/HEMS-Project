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
        public long Id  { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }

        private Person() { }

        public Person(
            string name,
            int age
            )
        {
            if (name.Length > 200)
            {
                throw new InvalidOperationException("O nome não pode ter mais que 200 caracteres");
            }
            if (age <= 0)
            {
                throw new InvalidOperationException("A idade não pode ser 0 ou negativa");
            }
            Name = name;
            Age = age;
        }
    }
}
