import Image from "next/image";
import { BsCart } from "react-icons/bs";

interface ProductCardProps {
    title: string,
    price: string,
    image: string
}

export default function ProductCard({ title, price, image }: ProductCardProps) {
    return (
        <div className="flex flex-col rounded w-100 bg-zinc-800 rounded-lg overflow-hidden">
            <Image 
                src={image}
                alt={title}
                width={300}
                height={300}
                className="w-full object-contain"
            />
            <div className="border-1 border-zinc-500 rounded-b-lg p-4">
                <h3 className="text-black font-semibold text-lg">{title}</h3>
                <p className="text-green-700 font-semibold text-lg">{price}</p>
                <button className="mt-2 cursor-pointer bg-green-700 p-2 rounded-xl w-full text-white font-semibold hover:bg-green-900 flex justify-center items-center">
                    <BsCart className="w-5 h-5 mr-4"/>
                    <p>Añadir al carrito</p>
                </button>
            </div>
        </div>
    )
}