using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEMS.Domain.Enums
{
    [Flags]
    public enum TypePurpose
    {
        Despesa = 0,
        Receita = 1,
        Ambos = 3
    }
}
