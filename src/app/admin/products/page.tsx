'use client';

import Image from "next/image";
import { useState } from "react";

export default function ProductsPage() {
    const allProducts = [
        {
            id: 1,
            title: "Air Max 90",
            description: "Zapas para tirar facha",
            brand: "Nike",
            price: "$190",
            category: "Running",
            sizes: [{
                size: 42,
                stock: 2
            }],
            images: [{
                url: "/images/sneakers.png",
                alt: "Foto de Air Max 90"
            }],
            discount: 0,
            isFeatured: false,
            isActive: true
        },
        {
            id: 2,
            title: "Air Jordan 1 Low",
            description: "Zapas like Jordan",
            brand: "Nike",
            price: "$190",
            category: "Basket",
            sizes: [
                {
                    size: 44,
                    stock: 3
                },
                {
                    size: 40,
                    stock: 5
                }
            ],
            images: [{
                url: "/images/sneakers.png",
                alt: "Foto de Air Jordan 1 Low"
            }],
            discount: 5,
            isFeatured: true,
            isActive: true
        },
        {
            id: 3,
            title: "Air Jordan 1 Low",
            description: "Zapas like Jordan",
            brand: "Nike",
            price: "$190",
            category: "Basket",
            sizes: [
                {
                    size: 44,
                    stock: 3
                },
                {
                    size: 40,
                    stock: 5
                }
            ],
            images: [{
                url: "/images/sneakers.png",
                alt: "Foto de Air Jordan 1 Low"
            }],
            discount: 5,
            isFeatured: true,
            isActive: true
        },
        {
            id: 4,
            title: "Zapa",
            description: "Zapas like Jordan",
            brand: "Topper",
            price: "$190",
            category: "Basket",
            sizes: [
                {
                    size: 44,
                    stock: 3
                },
                {
                    size: 40,
                    stock: 5
                }
            ],
            images: [{
                url: "/images/sneakers.png",
                alt: "Foto de Air Jordan 1 Low"
            }],
            discount: 5,
            isFeatured: true,
            isActive: true
        },
        {
            id: 5,
            title: "Toy",
            description: "Zapas like Jordan",
            brand: "Puma",
            price: "$190",
            category: "Basket",
            sizes: [
                {
                    size: 44,
                    stock: 3
                },
                {
                    size: 40,
                    stock: 5
                }
            ],
            images: [{
                url: "/images/sneakers.png",
                alt: "Foto de Air Jordan 1 Low"
            }],
            discount: 5,
            isFeatured: true,
            isActive: true
        },
        {
            id: 6,
            title: "Clasics",
            description: "Zapas like Jordan",
            brand: "Converse",
            price: "$190",
            category: "Basket",
            sizes: [
                {
                    size: 44,
                    stock: 3
                },
                {
                    size: 40,
                    stock: 5
                }
            ],
            images: [{
                url: "/images/sneakers.png",
                alt: "Foto de Air Jordan 1 Low"
            }],
            discount: 5,
            isFeatured: true,
            isActive: true
        },
        {
            id: 7,
            title: "Superstars",
            description: "Zapas like Jordan",
            brand: "Adidas",
            price: "$190",
            category: "Basket",
            sizes: [
                {
                    size: 44,
                    stock: 3
                },
                {
                    size: 40,
                    stock: 5
                }
            ],
            images: [{
                url: "/images/sneakers.png",
                alt: "Foto de Air Jordan 1 Low"
            }],
            discount: 5,
            isFeatured: true,
            isActive: true
        },
        {
            id: 8,
            title: "Air Jordan 1 Low",
            description: "Zapas like Jordan",
            brand: "Nike",
            price: "$190",
            category: "Basket",
            sizes: [
                {
                    size: 44,
                    stock: 3
                },
                {
                    size: 40,
                    stock: 5
                }
            ],
            images: [{
                url: "/images/sneakers.png",
                alt: "Foto de Air Jordan 1 Low"
            }],
            discount: 5,
            isFeatured: true,
            isActive: true
        },
        {
            id: 9,
            title: "Air Jordan 1 Low",
            description: "Zapas like Jordan",
            brand: "Nike",
            price: "$190",
            category: "Basket",
            sizes: [
                {
                    size: 44,
                    stock: 3
                },
                {
                    size: 40,
                    stock: 5
                }
            ],
            images: [{
                url: "/images/sneakers.png",
                alt: "Foto de Air Jordan 1 Low"
            }],
            discount: 5,
            isFeatured: true,
            isActive: true
        },
        {
            id: 10,
            title: "Air Jordan 1 Low",
            description: "Zapas like Jordan",
            brand: "Nike",
            price: "$190",
            category: "Basket",
            sizes: [
                {
                    size: 44,
                    stock: 3
                },
                {
                    size: 40,
                    stock: 5
                }
            ],
            images: [{
                url: "/images/sneakers.png",
                alt: "Foto de Air Jordan 1 Low"
            }],
            discount: 5,
            isFeatured: true,
            isActive: true
        },
        {
            id: 11,
            title: "Air Jordan 1 Low",
            description: "Zapas like Jordan",
            brand: "Nike",
            price: "$190",
            category: "Basket",
            sizes: [
                {
                    size: 44,
                    stock: 3
                },
                {
                    size: 40,
                    stock: 5
                }
            ],
            images: [{
                url: "/images/sneakers.png",
                alt: "Foto de Air Jordan 1 Low"
            }],
            discount: 5,
            isFeatured: true,
            isActive: true
        },
        {
            id: 12,
            title: "Air Jordan 1 Low",
            description: "Zapas like Jordan",
            brand: "Nike",
            price: "$190",
            category: "Basket",
            sizes: [
                {
                    size: 44,
                    stock: 3
                },
                {
                    size: 40,
                    stock: 5
                }
            ],
            images: [{
                url: "/images/sneakers.png",
                alt: "Foto de Air Jordan 1 Low"
            }],
            discount: 5,
            isFeatured: true,
            isActive: true
        },
    ]

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredProducts = allProducts.filter(product => (
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
        (selectedCategory === "" || product.category === selectedCategory)
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1 ) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="space-y-4">
            <div>
                <h2 className="font-bold text-4xl">Gestión de productos</h2>
                <p className="text-2xl">Gestiona tu inventario de productos</p>
            </div>
            <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-1 items-center gap-2">
                    <input 
                        type="text" 
                        placeholder="Buscar producto..."
                        className="bg-zinc-700 border-1 border-zinc-500 p-2 rounded-lg"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <select
                        className="bg-zinc-700 p-2 border-1 border-zinc-500 rounded-lg"
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setCurrentPage(1);
                        }}
                        value={selectedCategory}
                    >
                        <option value="">Todas las categorías</option>
                        <option value="Running">Running</option>
                        <option value="Trekking">Trekking</option>
                        <option value="Urban">Urban</option>
                        <option value="Basket">Basket</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="cursor-pointer bg-green-700 p-2 rounded-lg w-full text-white font-semibold hover:bg-green-900"
                    >
                        + Nuevo producto
                    </button>
                </div>
            </div>
            <div className="rounded-md border border-zinc-700 overflow-hidden">
                <table className="w-full table-auto">
                    <thead className="bg-zinc-700 text-left">
                        <tr>
                            <th className="p-4">Imagen</th>
                            <th className="p-4">Marca</th>
                            <th className="p-4">Producto</th>
                            <th className="p-4">Categoría</th>
                            <th className="p-4">Precio</th>
                            <th className="p-4">Talles / Stock</th>
                            <th className="p-4">Activo</th>
                            <th className="p-4">Descuento</th>
                            <th className="p-4">Destacado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedProducts.map((product) => (
                            <tr key={product.id} className="border-t border-zinc-700 align-top">
                                <td className="p-4">
                                    <Image
                                        src={product.images[0].url}
                                        alt={product.images[0].alt}
                                        width={60}
                                        height={60}
                                        className="rounded"
                                    />
                                </td>
                                <td className="p-4">{product.brand}</td>
                                <td className="p-4">{product.title}</td>
                                <td className="p-4">{product.category}</td>
                                <td className="p-4">{product.price}</td>
                                <td className="p-4">
                                    <div className="flex flex-col gap-1">
                                        {product.sizes.map((s, index) => (
                                            <span key={index}>{s.size} ({s.stock})</span>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-4">{product.isActive ? 'Sí' : 'No'}</td>
                                <td className="p-4">{product.discount}%</td>
                                <td className="p-4">{product.isFeatured ? 'Sí' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredProducts.length === 0 && (
                    <div className="font-semibold text-center font-4xl p-10">No se encontraron productos</div>
                )}
            </div>

            {totalPages > 1  && (
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className=""
                    >
                        Anterior
                    </button>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    )
}