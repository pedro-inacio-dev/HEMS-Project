"use client"

import { useEffect, useState } from "react"
import { TotalByCategory } from "@/types/mainEntities"
import categoryService from "@/services/categoryService"
import { formatCurrency } from "@/utils/format"

export default function CategoryTotalPage() {
    const [pessoas, setPessoas] = useState<TotalByCategory | null>(null)

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        try {
            const data = await categoryService.getAllInfo()
            setPessoas(data)
        } catch (error: any) {
            console.error("Erro ao listar pessoas:", error)
            alert("Não foi possível listar pessoas.")
        }
    }

    return (
        <div style={{ padding: 40 }}>
            <h1 className="text-3xl font-bold" style={{ marginBottom: 10 }}>
                Lista de Total por Categoria
            </h1>

            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                <table className="w-full text-sm text-left rtl:text-right text-body" >
                    <thead className="bg-neutral-secondary-soft border-b border-default">
                        <tr style={{backgroundColor: "black"}}>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Categorias
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Receitas
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Despesas
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Saldo
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pessoas?.valueByCategoryDTOs?.length === 0 ? (
                            <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                <td className="px-6 py-4">
                                    Nenhuma categoria cadastrada.
                                </td>
                            </tr>
                        ) : (
                            pessoas?.valueByCategoryDTOs?.map((pessoa, index) => (
                                <tr
                                    key={pessoa.description}
                                    style={{
                                        borderBottom: '1px solid',
                                    }}
                                    className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default" 
                                >
                                    <td className="px-6 py-4">
                                        {pessoa.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formatCurrency(pessoa.revenue)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formatCurrency(pessoa.expense)}
                                    </td>
                                    <td style={{
                                        padding: '12px',
                                        fontWeight: 'bold',
                                        color: pessoa.balance >= 0 ? '#10b981' : '#ef4444'
                                    }}>
                                        {formatCurrency(pessoa.balance)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    <tfoot>
                        <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default" style={{backgroundColor: "black"}}>
                            <td className="px-6 py-4">
                                <strong>
                                    Total: {pessoas?.totalCategories}
                                </strong>
                            </td>
                            <td className="px-6 py-4 text-green-600">
                                {formatCurrency(pessoas?.totalRevenue)}
                            </td>
                            <td className="px-6 py-4 text-red-600">
                                {formatCurrency(pessoas?.totalExpense)}
                            </td>
                            <td className={`px-6 py-4 ${
                                pessoas && pessoas?.totalBalance >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {formatCurrency(pessoas?.totalBalance)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: "fixed" as const,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    modal: {
        backgroundColor: "#000000",
        padding: 30,
        borderRadius: 8,
        width: 400,
        display: "flex",
        flexDirection: "column" as const,
        gap: 15,
    },

    row: {
        display: "flex",
        gap: 10,
        marginTop: 20,
        alignItems: "center"
    },
}