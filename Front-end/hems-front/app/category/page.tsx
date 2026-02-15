"use client"

import { useEffect, useState } from "react"
import { Category } from "@/types/mainEntities"
import categoryService from "@/services/categoryService"
import { options } from "@/types/optionType"
import { getTypeName } from "@/utils/format"

export default function CategoriasPage() {
    const [categorias, setCategories] = useState<Category[]>([])
    const [personEditing, setPersonEditing] = useState<Category | null>(null)
    const [personDeleting, setPersonDeleting] = useState<Category | null>(null)

    const [selectedValue, setSelectedValue] = useState<string>('');

    useEffect(() => {
        getData()
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
        console.log('Valor selecionado:', event.target.value);
    };

    async function getData() {
        try {
            const data = await categoryService.getCategory()
            setCategories(data)
        } catch (error: any) {
            console.error("Erro ao listar categorias:", error)
            alert("Não foi possível listar categorias.")
        }
    }

    async function deletingEntity() {
        try {
            if (personDeleting?.id) {
                await categoryService.deletecategory(personDeleting.id)
            }

        } catch (error: any) {
            console.error("Erro ao deletar categoria:", error)
            alert("Não foi possível deletar a categoria.")
        }
        finally {
            getData()
            closeModal()
        }
    }

    function openModal(isToDelete: Boolean = false, categoria?: Category) {
        if (isToDelete && categoria) {
            setPersonDeleting(categoria)
        }
        else if (categoria !== undefined) {
            setPersonEditing(categoria)
        }
        else {
            setPersonEditing({
                description: "",
                type: undefined
            })
        }
    }

    function closeModal() {
        setSelectedValue("")
        if (personDeleting) {
            setPersonDeleting(null)
        } else {
            setPersonEditing(null)
        }
    }

    async function save() {
        try {
            if(personEditing){
                personEditing.type = parseInt(selectedValue, 10)
            }

            if (personEditing?.id) {
                await categoryService.update(personEditing.id, personEditing)
            }
            else if (personEditing) {
                await categoryService.create(personEditing)
            }
        } catch (error: any) {
            console.error(`Erro ao ${personEditing?.id ? "editar" : "salvar"} categoria:`, error)
            alert(`Não foi possível ${personEditing?.id ? "editar" : "salvar"} a categoria.`)
        }
        finally {
            getData()
            closeModal()
        }
    }

    return (
        <div style={{ padding: 40 }}>
            <h1 className="text-3xl font-bold">
                Lista de Categorias
            </h1>
            <div style={styles.row}>
                <div style={{ marginBottom: 10 }}>
                    <button style={styles.addButton} onClick={() => openModal()}>
                        Cadastrar Categoria
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
                                Tipo
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias?.length === 0 ? (
                            <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                <td className="px-6 py-4">
                                    Nenhuma pessoa cadastrada.
                                </td>
                            </tr>
                        ) : (
                            categorias?.map((categoria, index) => (
                                <tr
                                    key={categoria.id}
                                    style={{
                                        borderBottom: '1px solid',
                                    }}
                                    className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default"
                                >
                                    <td className="px-6 py-4">
                                        {categoria.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {categoria.type ? getTypeName(categoria.type) : "-"}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {personEditing && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h2>
                            {personEditing.id ? "Editar Pessoa" : "Cadastrar Pessoa"}
                        </h2>

                        <div style={{
                            ...styles.column
                        }}>
                            <label htmlFor="description" style={{ color: "gray" }}>Descrição</label>
                            <input
                                id="description"
                                value={personEditing.description}
                                style={styles.input}
                                onChange={e =>
                                    setPersonEditing(prev =>
                                        prev ? { ...prev, description: e.target.value } : null
                                    )
                                }
                            />

                            <label htmlFor="typeCategory" style={{ color: "gray" }}>Tipo de Categoria</label>
                            <select
                                id="typeCategory"
                                value={selectedValue}
                                onChange={handleChange}
                                style={{backgroundColor: "black"}}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Selecione uma opção</option>
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.column}>
                            <div style={styles.column}>
                                <button style={styles.saveButton} onClick={save}>
                                    {personEditing.id ? "Salvar edição" : "Salvar"}
                                </button>

                                <button style={styles.cancelButton} onClick={closeModal}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* {personDeleting && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h2 style={{ marginBottom: 20 }}>
                            Deletar Pessoa
                        </h2>

                        <div>
                            <p>
                                Tem certeza que deseja deletar a categoria de nome 
                                <strong style={{ padding: 5}}>
                                    {personDeleting.description}
                                </strong>
                                ? Essa ação NÃO poderá ser desfeita
                            </p>
                        </div>
                        <div style={styles.column}>
                            <div style={styles.column}>
                                <button style={styles.saveButton} onClick={deletingEntity}>
                                    Deletar categoria
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

    editButton: {
        padding: "8px 16px",
        backgroundColor: "#d1eb25",
        color: "black",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
    },

    deleteButton: {
        padding: "8px 16px",
        backgroundColor: "#de4c45",
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