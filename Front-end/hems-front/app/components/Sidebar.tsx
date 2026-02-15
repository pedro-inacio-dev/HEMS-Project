"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
    const pathname = usePathname()

    const links = [
        { href: "/", label: "Início" },
        { href: "/TotalByPerson", label: "Total por Pessoa" },
        { href: "/TotalByCategory", label: "Total por Categoria" },
        { href: "/person", label: "Pessoa" },
        { href: "/transaction", label: "Transação" },
        { href: "/category", label: "Categoria" }
    ]

    return (
        <aside style={styles.sidebar}>
            <h2 style={{ marginBottom: 20 }} className="text-3xl font-bold">
                <Link
                    key="/"
                    href="/"
                >
                    HEMS
                </Link>
            </h2>

            {links.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    style={{
                        ...styles.link,
                        backgroundColor:
                            pathname === link.href ? "#333" : "transparent"
                    }}
                >
                    {link.label}
                </Link>
            ))}
        </aside>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    sidebar: {
        width: "220px",
        height: "100vh",
        background: "#111",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column"
    },
    link: {
        padding: "10px",
        color: "white",
        textDecoration: "none",
        borderRadius: "6px",
        marginBottom: "8px"
    }
}