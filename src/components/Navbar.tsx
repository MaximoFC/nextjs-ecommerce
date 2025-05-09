'use client';

import { bebasneue } from "@/lib/fonts";
import { BsSearch, BsPerson, BsCart, BsList } from "react-icons/bs";
import { useState } from "react";
import Modal from "@/components/Modal";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "./RegisterForm";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Navbar() {
    const [formType, setFormType] = useState<'login' | 'register'>('login');
    const [showForm, setShowForm] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, loading } = useCurrentUser();

    const openLogin = () => {
        setShowForm(true);
        setFormType('login');
    }

    return(
        <section className="sticky top-0 z-100">
            <nav className="flex justify-between items-center bg-zinc-800 text-white p-4 relative">
                <div className="flex gap-6 items-center font-semibold">
                    <h2 
                        className={`${bebasneue.className} text-4xl`}
                    >URBAN<span className="text-green-700">KICKS</span></h2>
                    <div className="hidden md:flex gap-6">
                        <a 
                            href=""
                            className="hover:text-green-700"
                        >
                            Running
                        </a>
                        <a 
                            href=""
                            className="hover:text-green-700"
                        >
                            Trekking
                        </a>
                        <a 
                            href=""
                            className="hover:text-green-700"
                        >
                            Urban
                        </a>
                        <a 
                            href=""
                            className="hover:text-green-700"
                        >
                            Basket
                        </a>
                    </div>
                </div>
                <div className="hidden md:flex gap-8">
                {!loading && (
                    user ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="cursor-pointer bg-green-700 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-900"
                            >
                                {user.email[0].toUpperCase()}
                            </button>
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-zinc-800 text-white rounded-lg shadow-md border border-zinc-700 z-50">
                                    {user.role === 'admin' && (
                                        <a
                                            href="/admin"
                                            className="block px-4 py-2 hover:bg-zinc-700 rounded-lg"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Panel Admin
                                        </a>
                                    )}
                                    <a
                                        href="/profile"
                                        className="block px-4 py-2 hover:bg-zinc-700 rounded-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Perfil
                                    </a>
                                    <button
                                        onClick={async () => {
                                            await fetch('/api/auth/logout', { method: 'POST' });
                                            window.location.href = '/';
                                        }}
                                        className="block px-4 py-2 hover:bg-red-700 rounded-lg w-full text-left cursor-pointer"
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button 
                            onClick={openLogin}
                            className="hover:text-green-700 cursor-pointer flex items-center text-xl gap-2"
                        >
                            <BsPerson className="w-7 h-7" /> Iniciar sesión
                        </button>
                    )
                )}

                </div>
                <button
                    className="md:hidden z-101"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <BsList />
                </button>
                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-zinc-900 flex flex-col gap-4 p-6 md:hidden">
                        <a 
                            href=""
                            className="hover:text-green-700"
                        >
                            Running
                        </a>
                        <a 
                            href=""
                            className="hover:text-green-700"
                        >
                            Trekking
                        </a>
                        <a 
                            href=""
                            className="hover:text-green-700"
                        >
                            Urban
                        </a>
                        <a 
                            href=""
                            className="hover:text-green-700"
                        >
                            Basket
                        </a>
                        <div className="flex gap-6 mt-4 w-full justify-center">
                            <button className="hover:text-green-700"><BsSearch className="w-6 h-6" /></button>
                            <button className="hover:text-green-700" onClick={openLogin}><BsPerson className="w-7 h-7" /></button>
                            <button className="hover:text-green-700"><BsCart className="w-6 h-6" /></button>
                        </div>
                    </div>
                )}
            </nav>
            <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
                {formType === 'login' ? (
                    <LoginForm switchToRegister={() => setFormType('register')} />
                ) : (
                    <RegisterForm switchToLogin={() => setFormType('login')}/>
                )}
            </Modal>
        </section>
    )
}