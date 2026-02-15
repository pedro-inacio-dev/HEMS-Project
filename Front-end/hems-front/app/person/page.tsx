"use client"

import { useEffect, useState } from "react"
import { Person } from "@/types/mainEntities"
import personService from "@/services/personService"

export default function PersonPage() {
    const [pessoas, setPessoas] = useState<Person[]>([])
    const [personEditing, setPersonEditing] = useState<Person | null>(null)
    const [personDeleting, setPersonDeleting] = useState<Person | null>(null)

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        try {
            const data = await personService.getPerson()
            setPessoas(data)
        } catch (error: any) {
            console.error("Erro ao listar pessoas:", error)
            alert("Não foi possível listar pessoas.")
        }
    }

    async function deletingEntity() {
        try {
            if (personDeleting?.id) {
                await personService.deletePerson(personDeleting.id)
            }

        } catch (error: any) {
            console.error("Erro ao deletar pessoa:", error)
            alert("Não foi possível deletar a pessoa.")
        }
        finally {
            getData()
            closeModal()
        }
    }

    function openModal(isToDelete: Boolean = false, pessoa?: Person) {
        if (isToDelete && pessoa) {
            setPersonDeleting(pessoa)
        }
        else if (pessoa !== undefined) {
            setPersonEditing(pessoa)
        }
        else {
            setPersonEditing({
                name: "",
                age: 0
            })
        }
    }

    function closeModal() {
        if (personDeleting) {
            setPersonDeleting(null)
        } else {
            setPersonEditing(null)
        }
    }

    async function save() {
        try {
            if (personEditing?.id) {
                await personService.update(personEditing.id, personEditing)
            }
            else if (personEditing) {
                await personService.create(personEditing)
            }
        } catch (error: any) {
            console.error(`Erro ao ${personEditing?.id ? "editar" : "salvar"} pessoa:`, error)
            alert(`Não foi possível ${personEditing?.id ? "editar" : "salvar"} a pessoa.`)
        }
        finally {
            getData()
            closeModal()
        }
    }

    return (

        <div style={{ padding: 40 }}>
            <h1 className="text-3xl font-bold">
                Lista de Pessoas
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
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Idade
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pessoas?.length === 0 ? (
                            <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                <td className="px-6 py-4">
                                    Nenhuma pessoa cadastrada.
                                </td>
                            </tr>
                        ) : (
                            pessoas?.map((pessoa, index) => (
                                <tr
                                    key={pessoa.id}
                                    style={{
                                        borderBottom: '1px solid',
                                    }}
                                    className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default"
                                >
                                    <td className="px-6 py-4">
                                        {pessoa.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pessoa.age}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button style={styles.editButton} onClick={() => openModal(false, pessoa)}>
                                            Editar
                                        </button>
                                        <button
                                            style={styles.deleteButton}
                                            onClick={() => openModal(true, pessoa)}
                                        >
                                            Deletar
                                        </button>
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
                            <label htmlFor="name" style={{ color: "gray" }}>Nome</label>
                            <input
                                id="name"
                                value={personEditing.name}
                                style={styles.input}
                                onChange={e =>
                                    setPersonEditing(prev =>
                                        prev ? { ...prev, name: e.target.value } : null
                                    )
                                }
                            />

                            <label htmlFor="age" style={{ color: "gray" }}>Idade</label>
                            <input
                                id="age"
                                type="number"
                                placeholder="Idade"
                                value={personEditing.age}
                                style={styles.input}
                                onChange={e =>
                                    setPersonEditing(prev =>
                                        prev
                                            ? { ...prev, age: Number(e.target.value) }
                                            : null
                                    )
                                }
                            />
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

            {personDeleting && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h2 style={{ marginBottom: 20 }}>
                            Deletar Pessoa
                        </h2>

                        <div>
                            <p>
                                Tem certeza que deseja deletar a pessoa de nome
                                <strong style={{ padding: 5 }}>
                                    {personDeleting.name}
                                </strong>
                                ? Essa ação NÃO poderá ser desfeita
                            </p>
                        </div>
                        <div style={styles.column}>
                            <div style={styles.column}>
                                <button style={styles.saveButton} onClick={deletingEntity}>
                                    Deletar pessoa
                                </button>

                                <button style={styles.cancelButton} onClick={closeModal}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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