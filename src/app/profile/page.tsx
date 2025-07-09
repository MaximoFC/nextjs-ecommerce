'use client'

import Navbar from "@/components/Navbar"
import { useState } from "react"
import { BsPerson, BsCardChecklist } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import ProfileSection from "@/components/ProfileSection";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Perfil', icon: BsPerson },
        { id: 'orders', label: 'Pedidos', icon: BsCardChecklist },
        { id: 'notifications', label: 'Notificaciones', icon: IoIosNotifications },
        { id: 'payment', label: 'Métodos de pago', icon: MdOutlinePayment },
    ]

    return (
        <div>
            <Navbar />
            <section className="text-white p-4 bg-zinc-800 space-y-4 w-full flex flex-col items-center">
                <h2 className="font-bold text-4xl">Mi cuenta</h2>
                <p className="text-2xl">Gestiona tu información personal y preferencias</p>
                <div className="bg-black rounded-xl inline-flex flex-row p-1">
                    {tabs.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`px-4 py-2 font-semibold rounded-xl cursor-pointer flex items-center gap-2 ${
                                activeTab === id
                                    ? 'bg-green-700 text-white'
                                    : 'text-gray-600 hover:text-green-700'
                            }`}
                        >
                            <Icon />
                            {label}
                        </button>
                    ))}
                </div>
                <div>
                    {activeTab === 'profile' && <ProfileSection />}
                    {activeTab === 'orders' && <OrdersSection />}
                    {activeTab === 'notifications' && <NotificationsSection />}
                    {activeTab === 'payment' && <PaymentSection />}
                </div>
            </section>
        </div>
    )
}

function OrdersSection() {
    return (
        <div>
            <h3>Tus órdenes</h3>
        </div>
    )
}

function NotificationsSection() {
    return (
        <div>
            <h3>Tus notificaciones</h3>
        </div>
    )
}

function PaymentSection() {
    return (
        <div>
            <h3>Tus métodos de pago</h3>
        </div>
    )
}