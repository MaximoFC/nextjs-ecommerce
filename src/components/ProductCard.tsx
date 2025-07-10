import Image from "next/image";
import { BsCart } from "react-icons/bs";
import { useState, useEffect } from "react";

interface ProductCardProps {
    title: string;
    price: string;
    images: {
        url: string;
        alt: string;
    }[];
}

export default function ProductCard({ title, price, images }: ProductCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!isHovered || images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [isHovered, images.length]);

    return (
        <div 
            className="flex flex-col rounded w-[80%] bg-zinc-800 rounded-lg overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setCurrentImageIndex(0);
            }}
        >

            <div className="relative w-full h-[300px] flex items-center justify-center bg-white">
                <Image 
                    src={images[currentImageIndex]?.url || "/fallback.jpg"}
                    alt={images[currentImageIndex]?.alt || title}
                    fill
                    className="object-contain p-4"
                />
            </div>

            <div className="border-1 border-zinc-500 rounded-b-lg p-4">
                <h3 className="text-white font-semibold text-lg">{title}</h3>
                <p className="text-green-700 font-semibold text-lg">{price}</p>
                <button className="mt-2 cursor-pointer bg-green-700 p-2 rounded-xl w-full text-white font-semibold hover:bg-green-900 flex justify-center items-center">
                    <BsCart className="w-5 h-5 mr-4"/>
                    <p>Añadir al carrito</p>
                </button>
            </div>
        </div>
    )
}