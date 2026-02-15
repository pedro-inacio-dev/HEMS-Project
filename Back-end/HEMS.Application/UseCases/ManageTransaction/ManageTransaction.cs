using HEMS.Application.DTOs;
using HEMS.Domain.Entities;
using HEMS.Domain.Enums;
using HEMS.Infrastructure.Interfaces;
using HEMS.Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Application.UseCases.ManageTransaction
{
    public class ManageTransaction
    {
        private readonly ITransactionRepository _repository;

        public ManageTransaction(ITransactionRepository repository)
        {
            _repository = repository;
        }

        private void checkCategory(TransactionDTO transactionDTO)
        {
            if (!transactionDTO.Category.Type.Equals((int)TypePurpose.Ambos) && !transactionDTO.Category.Type.Equals(transactionDTO.Type))
            {
                throw new InvalidOperationException("Transação deve ser do mesmo tipo da Categoria escolhida");
            }
        }

        public async Task CreateTransaction(TransactionDTO transactionDTO)
        {
            checkCategory(transactionDTO);
            Transaction transaction = new Transaction(
                transactionDTO.Description,
                transactionDTO.Value,
                (TypePurpose)transactionDTO.Type,
                transactionDTO.Category.Id,
                transactionDTO.Person.Id
                );
            Transaction created = await _repository.AddAsync(transaction);
        }

        public async Task UpdateTransaction(TransactionDTO transactionDTO)
        {
            if (transactionDTO.Id == 0)
            {
                throw new InvalidOperationException("objeto tem que ter id para ser atualizado");
            }
            checkCategory(transactionDTO);

            Transaction transaction = new Transaction(
                transactionDTO.Description,
                transactionDTO.Value,
                (TypePurpose)transactionDTO.Type,
                transactionDTO.Category.Id,
                transactionDTO.Person.Id
                );
            transaction.Id = transactionDTO.Id;
            Transaction created = await _repository.UpdateAsync(transaction);
        }

        public async Task DeleteTransaction(long id)
        {
            Transaction? obj = await _repository.GetByIdAsync(id);
            if (obj == null)
            {
                throw new Exception("objeto não foi encontrado no banco para deletar");
            }
            await _repository.DeleteAsync(obj);
        }

        public async Task<List<TransactionDTO>> GetAllTransaction()
        {
            List<Transaction> obj = await _repository.GetAllAsync();
            if (obj.Count == 0)
            {
                return new List<TransactionDTO>();
            }
            return obj.Select(e => new TransactionDTO
            {
                Id = e.Id,
                Description = e.Description,
                Value = e.Value,
                Type = (int)e.TypePurpose,
                Category = new CategoryDTO()
                {
                    Id = e.Category.Id,
                    Description = e.Category.Description,
                    Type = (int)e.Category.TypePurpose,
                },
                Person = new PersonDTO
                {
                    Id = e.Person.Id,
                    Name = e.Person.Name,
                    Age = e.Person.Age
                },
            }
            ).ToList();
        }

        public async Task<TransactionDTO?> GetTransactionById(long id)
        {
            Transaction? obj = await _repository.GetByIdAsync(id);
            if (obj == null)
            {
                throw new Exception("objeto não foi encontrado no banco");
            }
            return new TransactionDTO
            {
                Id = obj.Id,
                Description = obj.Description,
                Value = obj.Value,
                Type = (int)obj.TypePurpose,
                Category = new CategoryDTO()
                {
                    Id = obj.Category.Id,
                    Description = obj.Category.Description,
                    Type = (int)obj.Category.TypePurpose,
                },
                Person = new PersonDTO
                {
                    Id = obj.Person.Id,
                    Name = obj.Person.Name,
                    Age = obj.Person.Age
                },
            };
        }
    }
}
