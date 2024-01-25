import Nav from '@/components/navbar'
import { Providers } from "@/store/provider"
import { AuthProvider } from "@/utils/AuthContext"
import "./globals.css"

export const metadata = {
  title: "Library App",
  description: "Test Ifabula",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <AuthProvider>
          <body className="font-mabry_pro thin-scroll overflow-y-scroll">
            <Nav />
            {children}
          </body>
        </AuthProvider>
      </Providers>
    </html>
  )
}
