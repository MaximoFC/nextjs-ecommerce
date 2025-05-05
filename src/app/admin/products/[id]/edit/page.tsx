import { ProductForm } from "../../_components/ProductForm";
import { ProductFormSchema } from "../../schemas/product-form-schema";
import { notFound } from "next/navigation";

type Props = {
    params: {
        id: string;
    }
}

const getProduct = async (id: string): Promise<ProductFormSchema | null> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`, {
            cache: 'no-store'
        });

        if( !res.ok ) return null;

        return await res.json();
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
            const res = await fetch(`${baseUrl}/api/products/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) throw new Error('Error updating product');
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