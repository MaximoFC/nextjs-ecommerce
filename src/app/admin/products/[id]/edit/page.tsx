import { ProductForm } from "../../_components/ProductForm";
import { ProductFormSchema } from "../../schemas/product-form-schema";
import { notFound } from "next/navigation";
import axios from "axios";

type Props = {
    params: {
        id: string;
    }
}

const getProduct = async (id: string): Promise<ProductFormSchema | null> => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`, {
            headers: {
                'Cache-Control': 'no-store'
            }
        });

        return res.data;
    } catch (error) {
        console.error('Error fetching product: ', error);
        return null;
    }
};

export default async function EditProductPage({ params }: Props) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const product = await getProduct(params.id);

    if(!product) return notFound();

    const updateProduct = async (data: ProductFormSchema) => {
        'use server';

        try {
            await axios.put(`${baseUrl}/api/products/${params.id}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error updating product: ', error);
            throw error;
        }
    };

    return (
        <main className="space-y-4">
            <h2 className="font-bold text-4xl">Editar Producto</h2>
            <p className="text-2xl">Edita los campos del producto seleccionado</p>
            <ProductForm initialData={product} onSubmit={updateProduct} />
        </main>
    )
}