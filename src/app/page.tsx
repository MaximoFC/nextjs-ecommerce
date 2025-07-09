'use client';

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { bebasneue } from "@/lib/fonts";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import axios from "axios";

interface Product {
    _id: string,
    title: string,
    description: string,
    brand: string,
    price: number,
    category: string,
    sizes: Size[],
    images: ImageType[],
    discount: number,
    isFeatured: boolean,
    isActive: boolean
}

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();

    const x = ((clientX - left) / width - 0.5) * 2;
    const y = ((clientY - top) / height - 0.5) * 2;

    setMousePos({ x, y });
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <Navbar />
      <section
        onMouseMove={handleMouseMove}
        className="h-[calc(100dvh-72px)] w-full flex items-center justify-center bg-gradient-to-l from-zinc-200 to-zinc-900"
      >
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10 w-[30%]">
          <h2 className={`${bebasneue.className} text-6xl md:text-8xl text-white`}>ESTILO</h2>
          <h2 className={`${bebasneue.className} text-6xl md:text-8xl text-green-700`}>SIN LÍMITES</h2>
          <p className="text-2xl text-white hidden md:flex">Versatilidad y estilo en una sola colección de zapas, para donde quieras que vayas.</p>
        </div>
        <div
          style={{
            transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
            transition: "transform 0.1s ease-out"
          }}
          className="w-[80%] max-w-[450px] h-auto"
        >
          <Image
            src="/images/sneakers.png"
            alt="sneakers"
            width={450}
            height={450}
            className="w-full h-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.25)]"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>
      <section
        className="bg-zinc-900 p-8"
      >
        <h2 className="text-white text-3xl font-semibold py-6">Productos destacados</h2>
        <p className="text-white text-xl">Las zapatillas más populares de nuestra colección</p>
        <div className="w-full pt-8 gap-8 grid grid-cols-1 md:grid-cols-3 justify-items-center">
          {products.map((product) => (
            <ProductCard 
              key={product._id}
              title={product.title}
              price={`$${product.price}`}
              images={product.images}
            />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
