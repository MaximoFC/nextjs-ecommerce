import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { UserProvider } from "@/contexts/UserContext";
import "./globals.css";

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ['100', '700']
});

export const metadata: Metadata = {
  title: "URBANKICKS",
  description: "Zapatillas en Tucumán",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={outfit.className} >
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
