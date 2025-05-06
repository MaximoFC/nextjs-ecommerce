'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import axios from "axios";
import { HashLoader } from "react-spinners";

interface Size {
    size: number,
    stock: number
}

interface ImageType {
    url: string,
    alt: string
}

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

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();    
    }, []);

    const filteredProducts = products.filter(product => (
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

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("¿Estás seguro de eliminar este producto?");
        if(!confirmDelete) return;

        try {
            await axios.delete(`/api/products/${id}`);
            setProducts((prev) => prev.filter((p) => p._id !== id));
        } catch (error) {
            console.error('Error deleting product: ', error);
        } finally {
            setOpenMenuId(null);
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-y-4">
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
                    <Link
                        href="/admin/products/new"
                    >
                        <button
                            className="cursor-pointer bg-green-700 p-2 rounded-lg w-full text-white font-semibold hover:bg-green-900"
                        >
                            + Nuevo producto
                        </button>
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-96">
                    <HashLoader size={80} color="#008236" />
                </div>
            ) : (
                <>
                    <div className="rounded-md border border-zinc-700 overflow-visible">
                        <table className="w-full table-auto">
                            <thead className="bg-zinc-700 text-left">
                                <tr>
                                    <th className="p-4 text-center">Imagen</th>
                                    <th className="p-4 text-center">Marca</th>
                                    <th className="p-4 text-center">Producto</th>
                                    <th className="p-4 text-center">Categoría</th>
                                    <th className="p-4 text-center">Precio</th>
                                    <th className="p-4 text-center">Talles / Stock</th>
                                    <th className="p-4 text-center">Activo</th>
                                    <th className="p-4 text-center">Descuento</th>
                                    <th className="p-4 text-center">Destacado</th>
                                    <th className="p-4 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedProducts.map((product) => (
                                    <tr key={product._id} className="border-t border-zinc-700 align-top">
                                        <td className="p-4">
                                            <Image
                                                src={product.images[0].url}
                                                alt={product.images[0].alt}
                                                width={60}
                                                height={60}
                                                className="rounded"
                                            />
                                            </td>
                                            <td className="p-4 text-center">{product.brand}</td>
                                            <td className="p-4 text-center">{product.title}</td>
                                            <td className="p-4 text-center">{product.category}</td>
                                            <td className="p-4 text-center">${product.price}</td>
                                            <td className="p-4 text-center">
                                            <div className="flex flex-col gap-1 items-center text-center">
                                                {product.sizes.map((s, index) => (
                                                    <span key={index}>{s.size} ({s.stock})</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">{product.isActive ? 'Sí' : 'No'}</td>
                                        <td className="p-4 text-center">{product.discount}%</td>
                                        <td className="p-4 text-center">{product.isFeatured ? 'Sí' : 'No'}</td>
                                        <td className="p-4 relative text-center">
                                            <div>
                                                <button
                                                    onClick={() => setOpenMenuId(openMenuId === product._id ? null : product._id)}
                                                    className="text-white hover:text-green-500 cursor-pointer"
                                                >
                                                    <BsThreeDotsVertical size={20} />
                                                </button>
                                                {openMenuId === product._id && (
                                                    <div className="absolute right-0 mt-2 w-32 bg-zinc-800 border border-zinc-700 rounded-lg shadow-md z-10">
                                                        <Link
                                                            href={`/admin/products/${product._id}/edit`}
                                                            className="block rounded-lg px-4 text-left py-2 text-sm hover:bg-zinc-700"
                                                        >
                                                            Editar
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(product._id)}
                                                            className="block rounded-lg w-full text-left px-4 py-2 text-sm hover:bg-red-700 cursor-pointer"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
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
                                className="cursor-pointer bg-green-700 p-4 rounded-lg text-white font-semibold hover:bg-green-900 disabled:bg-zinc-900 disabled:cursor-default"
                            >
                                <MdOutlineArrowBackIos />
                            </button>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="cursor-pointer bg-green-700 p-4 rounded-lg text-white font-semibold hover:bg-green-900 disabled:bg-zinc-900 disabled:cursor-default"
                            >
                                <MdOutlineArrowForwardIos />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}