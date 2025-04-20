'use client';

import { BsInstagram, BsTwitterX, BsFacebook } from "react-icons/bs";
import { bebasneue } from "@/lib/fonts";

export default function Footer() {
    return (
        <footer className="bg-black text-white p-10 w-full flex flex-col gap-10 items-center">
            <div className="flex justify-around gap-20">
                <div className="flex flex-col gap-4">
                    <div className="gap-4">
                        <h2 className={`${bebasneue.className} text-4xl`}>URBAN<span className="text-green-700">KICKS</span></h2>
                        <p>La mejor selección de zapatillas en Tucumán.</p>
                    </div>
                    <div className="flex justify-around">
                        <a href="https://www.instagram.com/" target="_blank" className="cursor-pointer hover:text-green-700"><BsInstagram className="h-5 w-5" /></a>
                        <a href="https://www.facebook.com/?locale=es_LA" target="_blank" className="cursor-pointer hover:text-green-700"><BsFacebook className="h-5 w-5" /></a>
                        <a href="https://x.com" target="_blank" className="cursor-pointer hover:text-green-700"><BsTwitterX className="h-5 w-5" /></a>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="font-bold">Compras</h2>
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
                <div className="flex flex-col gap-4">
                    <h2 className="font-bold">Información</h2>
                    <a href="" className="hover:text-green-700">Sobre Nosotros</a>
                    <a href="" className="hover:text-green-700">Contacto</a>
                    <a href="" className="hover:text-green-700">Términos y condiciones</a>
                    <a href="" className="hover:text-green-700">Política de privacidad</a>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="font-bold">Suscríbete</h2>
                    <p>Recibe nuestras novedades y ofertas exclusivas</p>
                    <form action=""
                        className="flex gap-4"
                    >
                        <input 
                            name="email"
                            type="email"
                            id="email"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="tu@email.com"
                            className="bg-zinc-700 p-2 rounded-xl w-full text-white border-1 border-white"
                        />
                        <button
                            type="submit"
                            className="cursor-pointer bg-green-700 p-2 rounded-xl w-full text-white font-semibold hover:bg-green-900"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
            <div 
                className="h-1 w-[90%] bg-white"
            />
            <p>@ 2025 URBANKICKS. Todos los derechos reservados.</p>
        </footer>
    )
}