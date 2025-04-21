'use client';

import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="absolute inset-0 bg-black opacity-60"
                onClick={onClose}
            />
            <div className="relative z-10 bg-zinc-800 p-6 rounded-xl w-[80%] h-[80%] md:max-w-md shadow-lg border-1 border-white">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white text-xl font-bold cursor-pointer p-2 hover:text-gray-400"
                >
                ✕
                </button>
                {children}
            </div>
        </div>
    )
}