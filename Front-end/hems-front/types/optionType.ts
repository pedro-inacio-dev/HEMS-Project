export interface OptionTypePurpose {
    value: string;
    label: string;
}

export const options: OptionTypePurpose[] = [
        { value: '1', label: 'Despesa' },
        { value: '2', label: 'Receita' },
        { value: '3', label: 'Ambos (Despesa e Receita)' },
    ];

export const optionsTransaction: OptionTypePurpose[] = [
    { value: '1', label: 'Despesa' },
    { value: '2', label: 'Receita' }
];