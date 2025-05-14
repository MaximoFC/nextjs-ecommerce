'use client'

import { useState } from "react";
import { useUser } from "@/contexts/UserContext";

interface LoginFormProps {
    switchToRegister: () => void;
    onLoginSuccess: () => void;
}

export default function LoginForm({switchToRegister, onLoginSuccess}: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });

        const data = await res.json();

        if (res.ok) {
            const data = await fetch('/api/auth/me', {
                credentials: 'include'
            });
            const { user } = await data.json();
            setUser(user);
            onLoginSuccess();
        } else {
            setError(data.error || 'An error ocurred');
        }
    };

    return (
        <div
            className="flex justify-center items-center"
        >
            <form
                className="p-10 rounded-xl flex flex-col gap-4 items-center"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl md:text-4xl font-semibold text-white text-center">Iniciar Sesión</h2>
                <p className="text-white text-md md:text-lg text-center">Ingresa tus datos para acceder a tu cuenta</p>
                {error && <div>{error}</div>}
                <div className="w-full flex flex-col gap-4">
                    <label 
                        htmlFor="email"
                        className="font-semibold"
                    >Email</label>
                    <input 
                        name="email"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="tu@email.com"
                        className="bg-zinc-700 p-2 rounded-xl w-full text-white border-1 border-white"
                    />
                </div>
                <div className="flex justify-between w-full">
                    <label 
                        htmlFor="password"
                        className="font-semibold"
                    >
                        Contraseña
                    </label>
                    <a 
                        href=""
                        className="font-semibold text-green-700 hover:underline hidden md:flex"
                    >
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
                <input 
                    name="password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Contraseña"
                    className="bg-zinc-700 p-2 rounded-xl w-full border-1 border-white text-white"
                />
                <a 
                    href=""
                    className="font-semibold text-green-700 hover:underline flex md:hidden"
                >
                    Recuperar contraseña
                </a>
                <button
                    type="submit"
                    className="cursor-pointer bg-green-700 p-2 rounded-xl w-full text-white font-semibold hover:bg-green-900"
                >
                    Iniciar Sesión
                </button>
                <div className="flex justify-center w-full">
                    <p className="text-white pr-4 hidden md:flex">¿No tienes una cuenta?</p>
                    <button 
                        onClick={switchToRegister}
                        className="text-green-700 font-semibold hover:underline cursor-pointer"
                    >
                        Regístrate
                    </button>
                </div>
            </form>
        </div>
    )
}