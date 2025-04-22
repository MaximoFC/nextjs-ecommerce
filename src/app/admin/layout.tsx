'use client';

import { bebasneue } from "@/lib/fonts";
import { MdDashboard } from "react-icons/md";
import { BsCardChecklist, BsBox2, BsBarChartLineFill } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout');
        router.push('/');
    }
    
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
                    <Link href="/admin" className="gap-4 mt-2 cursor-pointer p-2 rounded w-full text-white font-semibold hover:bg-zinc-800 flex justify-center items-center">
                        <MdDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link href="/admin/orders" className="gap-4 cursor-pointer p-2 rounded w-full text-white font-semibold hover:bg-zinc-800 flex justify-center items-center">
                        <BsCardChecklist className="h-5 w-5" />
                        Órdenes
                    </Link>
                    <Link href="/admin/products" className="gap-4 cursor-pointer p-2 rounded w-full text-white font-semibold hover:bg-zinc-800 flex justify-center items-center">
                        <BsBox2 className="h-5 w-5" />
                        Productos
                    </Link>
                    <Link href="/admin/stats" className="gap-4 cursor-pointer p-2 rounded w-full text-white font-semibold hover:bg-zinc-800 flex justify-center items-center">
                        <BsBarChartLineFill className="h-5 w-5" />
                        Estadísticas
                    </Link>
                </div>
                <div className="border-t-1 border-white w-full flex justify-center my-4 p-4">
                    <button
                        className="flex justify-center gap-4 items-center cursor-pointer hover:bg-zinc-800 rounded w-full p-2 font-semibold"
                        onClick={handleLogout}
                    >
                        <RiLogoutBoxLine className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </nav>
            <main className="bg-zinc-900 w-full text-white min-h-dvh p-6">
                {children}
            </main>
        </section>
    )
}