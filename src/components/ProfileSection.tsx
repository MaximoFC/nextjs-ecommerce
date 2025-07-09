'use client';

import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileSection() {
    const { user, setUser } = useUser();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState({
        street: '',
        city: '',
        zip: '',
        country: ''
    });

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name || '')
            setEmail(user.email || '')
            setAddress({
                street: user.address?.street || '',
                city: user.address?.city || '',
                zip: user.address?.zip || '',
                country: user.address?.country || ''
            })
        }
    }, [user]);

    async function handleUpdate() {
        try {
            const { data } = await axios.put('/api/users/update', {
                name,
                email,
                address
            });
            setUser(data.user);
            setSuccess('Datos actualizados correctamente');
            setError('');
        } catch (error) {
            setError('Error actualizando los datos');
            console.error('Error: ', error);
            setSuccess('');
        }
    }

    async function handleDelete() {
        if (!confirm('¿Querés eliminar tu cuenta? Esta acción no se puede deshacer')) return;

        try {
            await axios.delete('/api/users/delete');
            setUser(null);
            window.location.href = '/';
        } catch {
            alert('Error al eliminar cuenta');
        }
    }

    return (
        <div className="max-w-xl space-y-4">
            <h3 className="text-xl font-bold">Información personal</h3>

            <input
                className="bg-zinc-700 p-2 rounded-xl w-full border-1 border-white text-white"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nombre"
            />

            <input
                className="bg-zinc-700 p-2 rounded-xl w-full border-1 border-white text-white"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
            />

            <h4 className="font-semibold mt-4">Dirección</h4>

            <input
                className="bg-zinc-700 p-2 rounded-xl w-full border-1 border-white text-white"
                value={address.street}
                onChange={e => setAddress(a => ({ ...a, street: e.target.value }))}
                placeholder="Calle"
            />
            <input
                className="bg-zinc-700 p-2 rounded-xl w-full border-1 border-white text-white"
                value={address.city}
                onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
                placeholder="Ciudad"
            />
            <input
                className="bg-zinc-700 p-2 rounded-xl w-full border-1 border-white text-white"
                value={address.zip}
                onChange={e => setAddress(a => ({ ...a, zip: e.target.value }))}
                placeholder="Código postal"
            />
            <input
                className="bg-zinc-700 p-2 rounded-xl w-full border-1 border-white text-white"
                value={address.country}
                onChange={e => setAddress(a => ({ ...a, country: e.target.value }))}
                placeholder="País"
            />

            <div className="w-full flex justify-center gap-10">
                <button
                    onClick={handleUpdate}
                    className="cursor-pointer bg-green-700 p-2 rounded-xl text-white font-semibold hover:bg-green-900"
                >
                    Guardar cambios
                </button>

                <button
                    onClick={handleDelete}
                    className="cursor-pointer bg-red-700 p-2 rounded-xl text-white font-semibold hover:bg-red-800"
                >
                    Eliminar cuenta
                </button>
            </div>

            {success && <p className="text-green-500">{success}</p>}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}
