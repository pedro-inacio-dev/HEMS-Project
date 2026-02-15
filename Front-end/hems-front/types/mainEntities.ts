export type Person = {
    id?: number
    name: string
    age: number
}

export type Category = {
    id?: number
    description: string
    type?: number
}

export type Transaction = {
    id?: number
    description: string
    value: number
    type: number
    category?: Category
    person?: Person
}

export type TotalByPerson = {
    valueByPersonDTOs: ValueByPerson[]
    totalPeople: number
    totalRevenue: number
    totalExpense: number
    totalBalance: number
}

export type TotalByCategory = {
    valueByCategoryDTOs: ValueByCategory[],
    totalCategories: number
    totalRevenue: number
    totalExpense: number
    totalBalance: number
}

export type ValueByPerson = {
    iDPerson : number
    name : string
    revenue : number
    expense : number
    balance : number
}

export type ValueByCategory = {
    IDCategory : number
    description : string
    revenue : number
    expense : number
    balance : number
}