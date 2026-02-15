using HEMS.Application.DTOs;
using HEMS.Domain.Entities;
using HEMS.Infrastructure.Interfaces;
using HEMS.Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Application.UseCases.ManagePerson
{
    public class ManagePerson
    {
        private readonly IPersonRepository _repository;

        public ManagePerson(IPersonRepository repository)
        {
            _repository = repository;
        }

        public async Task CreatePerson(PersonDTO personDTO)
        {
            Person person = new Person(personDTO.Name, personDTO.Age);
            Person created = await _repository.AddAsync(person);
        }

        public async Task UpdatePerson(PersonDTO personDTO)
        {
            if (personDTO.Id == 0)
            {
                throw new InvalidOperationException("objeto tem que ter id para ser atualizado");
            }
            Person person = new Person(personDTO.Name, personDTO.Age);
            person.Id = personDTO.Id;
            Person created = await _repository.UpdateAsync(person);
        }

        public async Task DeletePerson(long id)
        {
            Person? obj = await _repository.GetByIdAsync(id);
            if (obj == null)
            {
                throw new Exception("objeto não foi encontrado no banco para deletar");
            }
            await _repository.DeleteAsync(obj);
        }

        public async Task<TotalByPersonDTO> GetTotalByPerson()
        {
            List<ValueByPersonDTO> obj = await _repository.GetValueByPersonAsync();
            TotalByPersonDTO objTotals = await _repository.GetTotalsByPersonAsync();
            if (objTotals.TotalPeople == 0)
            {
                return new TotalByPersonDTO();
            }
            objTotals.ValueByPersonDTOs = obj;
            return objTotals;
        }

        public async Task<List<PersonDTO>> GetAllPerson()
        {
            List<Person> obj = await _repository.GetAllAsync();
            if (obj.Count == 0)
            {
                return new List<PersonDTO>();
            }
            return obj.Select(e => new PersonDTO
                {
                    Id = e.Id,
                    Name = e.Name,
                    Age = e.Age
                }
            ).ToList();
        }

        public async Task<PersonDTO?> GetPersonById(long id)
        {
            Person? obj = await _repository.GetByIdAsync(id);
            if (obj == null)
            {
                throw new Exception("objeto não foi encontrado no banco");
            }
            return new PersonDTO
            {
                Id = obj.Id,
                Name = obj.Name,
                Age = obj.Age
            };
        }
    }
}
