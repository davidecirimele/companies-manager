import type { Metadata } from "next";
import { ApiProvider } from "@/app/api/api";
import "./globals.css";
import Link from 'next/link'; // Importa Link

export const metadata: Metadata = {
  title: "Companies Manager",
  description: "A simple management system for companies and employees",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                <Link className="nav-link active" aria-current="page" href="/company/new">Add new Company</Link>
                <Link className="nav-link active" aria-current="page" href="/employee/new">Add new Employee</Link>
            </div>
          </div>
        </div>
        </nav>
        <ApiProvider>
          {children}
        </ApiProvider>
      </body>
    </html>
  );
}
