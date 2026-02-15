import Sidebar from "./components/Sidebar"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body style={{ margin: 0, display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "30px" }}>
          {children}
        </main>
      </body>
    </html>
  )
}