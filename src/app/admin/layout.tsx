'use client';

import { bebasneue } from "@/lib/fonts";
import { MdDashboard } from "react-icons/md";
import { BsCardChecklist, BsBox2, BsBarChartLineFill } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: <MdDashboard className="h-5 w-5" /> },
        { href: "/admin/orders", label: "Órdenes", icon: <BsCardChecklist className="h-5 w-5" /> },
        { href: "/admin/products", label: "Productos", icon: <BsBox2 className="h-5 w-5" /> },
        { href: "/admin/stats", label: "Estadísticas", icon: <BsBarChartLineFill className="h-5 w-5" /> }
    ]
    
    return (
        <section className="flex w-full">
            <nav className="h-dvh w-[20%] bg-black text-white flex flex-col items-center p-4 justify-between sticky left-0 top-0">
                <div className="flex items-end border-b-1 border-white w-full justify-center">
                    <h2
                        className={`${bebasneue.className} text-4xl`}
                    >
                        URBAN<span className="text-green-700">KICKS</span>
                    </h2>
                    <p className={`${bebasneue.className} text-md`}>admin</p>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    {navItems.map((({ href, label, icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`gap-4 cursor-pointer p-2 rounded w-full font-semibold flex justify-center hover:bg-zinc-800 ${
                                pathname === href ? "text-green-700" : "text-white"
                            }`}
                        >
                            {icon}
                            {label}
                        </Link>
                    )))}
                </div>
                <div className="border-t-1 border-white w-full flex justify-center my-4 p-4">
                    <Link
                        className="flex justify-center gap-4 items-center cursor-pointer hover:bg-zinc-800 rounded w-full p-2 font-semibold"
                        href="/"
                    >
                        <RiLogoutBoxLine className="w-5 h-5" />
                        Inicio
                    </Link>
                </div>
            </nav>
            <main className="bg-zinc-900 w-full text-white min-h-dvh p-6">
                {children}
            </main>
        </section>
    )
}