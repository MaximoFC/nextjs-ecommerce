'use client';

import { bebasneue } from "@/lib/fonts";
import { BsSearch, BsPerson, BsCart } from "react-icons/bs";
import { useState } from "react";
import Modal from "@/components/Modal";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "./RegisterForm";

export default function Navbar() {
    const [formType, setFormType] = useState<'login' | 'register'>('login');
    const [showForm, setShowForm] = useState(false);

    const openLogin = () => {
        setShowForm(true);
        setFormType('login');
    }

    return(
        <section className="sticky top-0 z-100">
            <nav className="flex justify-between items-center bg-zinc-800 text-white p-4">
            <div className="flex gap-6 items-center font-semibold">
                <h2 
                    className={`${bebasneue.className} text-4xl`}
                >URBAN<span className="text-green-700">KICKS</span></h2>
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
            <div className="flex gap-8">
                <button className="cursor-pointer hover:text-green-700">
                    <BsSearch className="w-6 h-6" />
                </button>
                <button 
                    className="cursor-pointer hover:text-green-700"
                    onClick={openLogin}
                >
                    <BsPerson className="w-7 h-7" />
                </button>
                <button className="cursor-pointer hover:text-green-700">
                    <BsCart className="w-6 h-6" />
                </button>
            </div>
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