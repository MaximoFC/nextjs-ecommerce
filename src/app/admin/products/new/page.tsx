'use client';

import { ProductForm } from "../_components/ProductForm";
import { ProductFormSchema } from "../schemas/product-form-schema";
import axios from "axios";

export default function NewProductPage() {
    const handleCreateProduct = async (data: ProductFormSchema) => {
        try {
            const res = await axios.post('/api/products', data);

            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Error creating product');
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