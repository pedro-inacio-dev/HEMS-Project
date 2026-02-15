import { options } from "@/types/optionType";

export const formatCurrency = (value: number | undefined): string => {
        if (value === undefined || value === null) return 'R$ 0,00';
        
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

export const getTypeName = (type : number | string) : string | undefined => {
    return options.find(t => Number(t.value) == Number(type))?.label;
}