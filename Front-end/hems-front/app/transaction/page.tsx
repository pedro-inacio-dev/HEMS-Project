"use client"

import { useEffect, useState } from "react"
import { Category, Person, Transaction } from "@/types/mainEntities"
import transactionService from "@/services/transactionService"
import personService from "@/services/personService"
import categoryService from "@/services/categoryService"
import { optionsTransaction } from "@/types/optionType"
import { formatCurrency, getTypeName } from "@/utils/format"

export default function TransactionPage() {
    const [transacoes, setTransacoes] = useState<Transaction[]>([])

    const [otionsPerson, setOptionsPerson] = useState<Person[]>([])
    const [otionsCategory, setOptionsCategory] = useState<Category[]>([])


    const [transactionEditing, setTransactionEditing] = useState<Transaction | null>(null)
    const [transactionDeleting, setTransactionDeleting] = useState<Transaction | null>(null)

    const [selectedTypeValue, setSelectedTypeValue] = useState<string>('');
    const [selectedPersonValue, setSelectedPersonValue] = useState<Person | null>(null);
    const [selectedCategoryValue, setSelectedCategoryValue] = useState<Category | null>(null);

    useEffect(() => {
        getData()
    }, [])

    const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTypeValue(event.target.value);
        console.log('Valor selecionado:', event.target.value);
    };

    const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const objFounded = otionsCategory.find(
            p => p.id === Number(event.target.value)
        );
        setSelectedCategoryValue(objFounded || null);
        console.log('Valor selecionado:', event.target.value);
    };

    const handleChangePerson = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const objFounded = otionsPerson.find(
            p => p.id === Number(event.target.value)
        );
        setSelectedPersonValue(objFounded || null);
        console.log('Valor selecionado:', event.target.value);
    };

    async function getData() {
        try {
            const data = await transactionService.getTransaction()
            const dataPerson = await personService.getPerson()
            const dataCategory = await categoryService.getCategory()
            setTransacoes(data)
            setOptionsPerson(dataPerson)
            setOptionsCategory(dataCategory)
        } catch (error: any) {
            console.error("Erro ao listar transacoes:", error)
            alert("Não foi possível listar transacoes.")
        }
    }

    // async function deletingEntity() {
    //     try {
    //         if (transactionDeleting?.id) {
    //             await transactionService.deleteTransaction(transactionDeleting.id)
    //         }

    //     } catch (error: any) {
    //         console.error("Erro ao deletar transacao:", error)
    //         alert("Não foi possível deletar a transacao.")
    //     }
    //     finally {
    //         getData()
    //         closeModal()
    //     }
    // }

    function openModal(isToDelete: Boolean = false, transacao?: Transaction) {
        if (isToDelete && transacao) {
            setTransactionDeleting(transacao)
        }
        else if (transacao !== undefined) {
            setTransactionEditing(transacao)
        }
        else {
            setTransactionEditing({
                description: "",
                value: 0,
                type: 0,
                category: undefined,
                person: undefined,
            })
        }
    }

    function closeModal() {
        setSelectedTypeValue("")
        setSelectedPersonValue(null)
        setSelectedCategoryValue(null)
        if (transactionDeleting) {
            setTransactionDeleting(null)
        } else {
            setTransactionEditing(null)
        }
    }

    async function save() {
        try {
            if (transactionEditing) {
                transactionEditing.type = parseInt(selectedTypeValue, 10)
                transactionEditing.category = selectedCategoryValue !== null ? selectedCategoryValue : undefined
                transactionEditing.person = selectedPersonValue !== null ? selectedPersonValue : undefined
            }


            if (transactionEditing?.id) {
                await transactionService.update(transactionEditing.id, transactionEditing)
            }
            else if (transactionEditing) {
                await transactionService.create(transactionEditing)
            }
        } catch (error: any) {
            console.error(`Erro ao ${transactionEditing?.id ? "editar" : "salvar"} transacao:`, error)
            alert(`Não foi possível ${transactionEditing?.id ? "editar" : "salvar"} a transacao.`)
        }
        finally {
            getData()
            closeModal()
        }
    }

    return (
        <div style={{ padding: 40 }}>
            <h1 className="text-3xl font-bold">
                Lista de Transações
            </h1>
            <div style={styles.row}>
                <div style={{ marginBottom: 10 }}>
                    <button style={styles.addButton} onClick={() => openModal()}>
                        Cadastrar Pessoa
                    </button>
                </div>

            </div>

            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                <table className="w-full text-sm text-left rtl:text-right text-body" >
                    <thead className="bg-neutral-secondary-soft border-b border-default">
                        <tr style={{ backgroundColor: "black" }}>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Descrição
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Valor
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Tipo
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Categoria
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Pessoa
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transacoes?.length === 0 ? (
                            <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                <td className="px-6 py-4">
                                    Nenhuma pessoa cadastrada.
                                </td>
                            </tr>
                        ) : (
                            transacoes?.map((transacao, index) => (
                                <tr
                                    key={transacao.id}
                                    style={{
                                        borderBottom: '1px solid',
                                    }}
                                    className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default"
                                >
                                    <td className="px-6 py-4">
                                        {transacao.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formatCurrency(transacao.value)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getTypeName(transacao.type)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {transacao.category?.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {transacao.person?.name}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {transactionEditing && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h2>
                            {transactionEditing.id ? "Editar Pessoa" : "Cadastrar Pessoa"}
                        </h2>

                        <div style={{
                            ...styles.column
                        }}>
                            <label htmlFor="description" style={{ color: "gray" }}>Descrição</label>
                            <input
                                id="description"
                                value={transactionEditing.description}
                                style={styles.input}
                                onChange={e =>
                                    setTransactionEditing(prev =>
                                        prev ? { ...prev, description: e.target.value } : null
                                    )
                                }
                            />

                            <label htmlFor="age" style={{ color: "gray" }}>Valor (R$)</label>
                            <input
                                id="age"
                                type="number"
                                placeholder="Idade"
                                value={transactionEditing.value}
                                style={styles.input}
                                onChange={e =>
                                    setTransactionEditing(prev =>
                                        prev
                                            ? { ...prev, value: Number(e.target.value) }
                                            : null
                                    )
                                }
                            />

                            <label htmlFor="typeTransaction" style={{ color: "gray" }}>Tipo de Transação</label>
                            <select
                                id="typeTransaction"
                                value={selectedTypeValue}
                                onChange={handleChangeType}
                                style={{ backgroundColor: "black" }}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Selecione uma opção</option>
                                {optionsTransaction.map((optionsTransaction) => (
                                    <option key={optionsTransaction.value} value={optionsTransaction.value}>
                                        {optionsTransaction.label}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="typePerson" style={{ color: "gray" }}>Pessoa</label>
                            <select
                                id="typePerson"
                                value={selectedPersonValue?.id}
                                onChange={handleChangePerson}
                                style={{ backgroundColor: "black" }}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Selecione uma opção</option>
                                {otionsPerson.map((otionsPerson) => (
                                    <option key={otionsPerson.id} value={otionsPerson.id}>
                                        {otionsPerson.name}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="typeCategory" style={{ color: "gray" }}>Categoria</label>
                            <select
                                id="typeCategory"
                                value={selectedCategoryValue?.id}
                                onChange={handleChangeCategory}
                                style={{ backgroundColor: "black" }}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Selecione uma opção</option>
                                {otionsCategory.map((otionsCategory) => (
                                    <option key={otionsCategory.id} value={otionsCategory.id}>
                                        {otionsCategory.description}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.column}>
                            <div style={styles.column}>
                                <button style={styles.saveButton} onClick={save}>
                                    {transactionEditing.id ? "Salvar edição" : "Salvar"}
                                </button>

                                <button style={styles.cancelButton} onClick={closeModal}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* {transactionDeleting && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h2 style={{ marginBottom: 20 }}>
                            Deletar Pessoa
                        </h2>

                        <div>
                            <p>
                                Tem certeza que deseja deletar a transacao de nome 
                                <strong style={{ padding: 5}}>
                                    {transactionDeleting.description}
                                </strong>
                                ? Essa ação NÃO poderá ser desfeita
                            </p>
                        </div>
                        <div style={styles.column}>
                            <div style={styles.column}>
                                <button style={styles.saveButton} onClick={deletingEntity}>
                                    Deletar transacao
                                </button>

                                <button style={styles.cancelButton} onClick={closeModal}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
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

    column: {
        display: "flex",
        flexDirection: "column" as const,
        gap: 12,
    },

    saveButton: {
        padding: "8px 16px",
        backgroundColor: "#25eb32",
        color: "black",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
    },

    cancelButton: {
        padding: "8px 16px",
        color: "black",
        backgroundColor: "#e5e7eb",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
    },

    addButton: {
        padding: "8px 16px",
        backgroundColor: "#4d65ec",
        color: "black",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
    },

    row: {
        display: "flex",
        gap: 10,
        marginTop: 20,
        alignItems: "center"
    },

    input: {
        backgroundColor: "gray",
        color: "black",
        padding: 5
    }
}