'use client'

import { useState } from "react";

interface RegisterFormProps {
    switchToLogin: () => void;
}

export default function RegisterForm({ switchToLogin }: RegisterFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Las contraseñas no coinciden');
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, name, password})
        });

        const data = await res.json();

        if (res.ok) {
            console.log('Registered');
        } else {
            setError(data.error || 'An error ocurred');
        }
    };

    return (
        <div
            className="flex justify-center items-center"
        >
            <form
                className="p-5 rounded-xl flex flex-col gap-2 items-start"
                onSubmit={handleSubmit}
            >
                <h2 className="text-4xl font-semibold text-white">Registrarse</h2>
                <p className="text-white text-lg text-center">Ingresa tus datos para crear tu cuenta</p>
                {error && <div className="text-red-500 font-semibold">{error}</div>}
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
                <label 
                    htmlFor="name"
                    className="font-semibold"
                >
                    Nombre
                </label>
                <input 
                    name="name"
                    type="text" 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Tu nombre"
                    className="bg-zinc-700 p-2 rounded-xl w-full text-white border-1 border-white"
                />
                <label 
                    htmlFor="password"
                    className="font-semibold"
                >
                    Contraseña
                </label>
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
                <label 
                    htmlFor="confirmPassword"
                    className="font-semibold"
                >
                    Confirmá tu contraseña
                </label>
                <input
                    name="confirmPassword"
                    type="password" 
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Repite tu contraseña"
                    className="bg-zinc-700 p-2 rounded-xl w-full border-1 border-white text-white"
                />
                <button
                    type="submit"
                    className="cursor-pointer bg-green-700 p-2 rounded-xl w-full text-white font-semibold hover:bg-green-900"
                >
                    Confirmar
                </button>
                <div className="flex justify-center w-full">
                    <p className="text-white pr-4">¿Ya tienes una cuenta?</p>
                    <button 
                        onClick={switchToLogin}
                        className="text-green-700 font-semibold hover:underline cursor-pointer"
                    >
                        Iniciá Sesión
                    </button>
                </div>
            </form>
        </div>
    )
}