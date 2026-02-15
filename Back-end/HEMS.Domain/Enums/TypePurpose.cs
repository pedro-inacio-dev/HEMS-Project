using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Domain.Enums
{
    public enum TypePurpose
    {
        Despesa = 1,
        Receita = 2,
        Ambos = 3
    }

    public static class TypePurposeExtensions
    {
        public static string GetDescription(this TypePurpose type)
        {
            return type switch
            {
                TypePurpose.Despesa => "Despesa",
                TypePurpose.Receita => "Receita",
                TypePurpose.Ambos => "Despesa e Receita",
                _ => "Não definido"
            };
        }
    }

}
