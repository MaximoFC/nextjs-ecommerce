'use client';

import { ProductForm } from "../_components/ProductForm";
import { ProductFormSchema } from "../schemas/product-form-schema";

export default function NewProductPage() {
    const handleCreateProduct = async (data: ProductFormSchema) => {
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if(!res.ok) {
                throw new Error('Error al crear el producto');
            }

            console.log('Producto creado correctamente');
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="font-bold text-4xl">Crear nuevo producto</h2>
            <p className="text-2xl">Añade un nuevo producto a tu inventario</p>
            <ProductForm onSubmit={handleCreateProduct} />
        </div>
    )
}