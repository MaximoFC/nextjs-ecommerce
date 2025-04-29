'use client';

import { productFormSchema, ProductFormSchema } from '../schemas/product-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { HashLoader } from "react-spinners";
import { useState } from 'react';

type ProductFormProps = {
    initialData?: ProductFormSchema;
    onSubmit: (data: ProductFormSchema) => void;
}

export const ProductForm = ({ initialData, onSubmit }: ProductFormProps) => {
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading(true);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();

            if (res.ok && data.url) {
                appendImage({ url: data.url, alt: file.name });
            } else {
                alert('Error al subir imagen');
                console.error(data.error);
            }
        } catch (error) {
            console.error('Upload error: ', error);
            alert('Error al subir imagen');
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    }

    const form = useForm<ProductFormSchema>({
        resolver: zodResolver(productFormSchema),
        defaultValues: initialData || {
            title: '',
            description: '',
            brand: '',
            price: 0,
            category: '',
            discount: 0,
            isFeatured: false,
            isActive: true,
            sizes: [{ size: 0, stock: 0 }],
            images: []
        }
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = form;

    const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
        control,
        name: 'sizes'
    });

    const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
        control,
        name: 'images'
    });

    const handleFormSubmit = (data: ProductFormSchema) => {
        onSubmit(data);
        if (!initialData) reset();
    };

    return (
        <form 
            onSubmit={handleSubmit(handleFormSubmit)}
            className='flex flex-col gap-4'
        >
            <div>
                <label htmlFor='brand'>Marca</label>
                <input 
                    {...register('brand')} 
                    id='brand'
                    className="bg-zinc-700 p-2 rounded-xl w-full border-1 border-white text-white"
                    placeholder='Ej: Nike'
                />
                {errors.brand && <p className='text-red-500'>Campo requerido</p>}
            </div>

            <div>
                <label htmlFor="title">Título</label>
                <input 
                    {...register('title')} 
                    id='title'
                    className="bg-zinc-700 p-2 rounded-xl w-full border-1 border-white text-white"
                    placeholder='Ej: Air Max 90'
                />
                {errors.title && <p className='text-red-500'>Campo requerido</p>}
            </div>
            
            <div>
                <label htmlFor="description">Descripción</label>
                <textarea 
                    {...register('description')} 
                    id='description'
                    className="bg-zinc-700 p-2 rounded-xl w-full border-1 border-white text-white"
                    placeholder='Ej: Estilo retro y comodidad incomparable: las Nike Air Max 90 combinan moda y funcionalidad en cada paso.'
                />
                {errors.description && <p className='text-red-500'>Campo requerido</p>}
            </div>

            <div>
                <label htmlFor='price'>Precio</label>
                <input 
                    type="number" 
                    {...register('price')} 
                    id='price'
                    className="bg-zinc-700 p-2 rounded-xl w-full border-1 border-white text-white"
                    placeholder='Ej: 190'
                />
                {errors.price && <p className='text-red-500'>Campo requerido</p>}
            </div>

            <div>
                <label htmlFor='category'>Categoría</label>
                <select 
                    {...register('category')} 
                    id='category'
                    className="bg-zinc-700 p-2 rounded-xl w-full border-1 border-white text-white"
                    defaultValue=""
                >
                    <option value="" disabled>Selecciona una categoría</option>
                    <option value="Running">Running</option>
                    <option value="Trekking">Trekking</option>
                    <option value="Urban">Urban</option>
                    <option value="Basket">Basket</option>
                </select>
                {errors.category && <p className='text-red-500'>Campo requerido</p>}
            </div>

            <div>
                <label htmlFor='discount'>Descuento (%)</label>
                <input 
                    type="number" 
                    {...register('discount')} 
                    id='discount'
                    className="bg-zinc-700 p-2 rounded-xl w-full border-1 border-white text-white"
                    placeholder='Ej: 10 (10% de descuento)'
                />
                {errors.discount && <p className='text-red-500'>Campo requerido</p>}
            </div>

            <div className='flex justify-around'>
                <div className='flex jusitfy-center gap-4'>
                    <label htmlFor='isfeatured'>Producto destacado</label>
                    <input type="checkbox" {...register('isFeatured')}/>
                </div>
                <div className='flex jusitfy-center gap-4'>
                    <label>Producto activo</label>
                    <input type="checkbox" {...register('isActive')} />
                </div>
            </div>

            <div>
                <label>Talles:</label>
                {sizeFields.map((field, index) => (
                    <div 
                        key={field.id}
                        className='w-full flex justify-start gap-5 my-4'
                    >
                        <input 
                            {...register(`sizes.${index}.size` as const)}
                            className='bg-zinc-700 p-2 rounded-xl border-1 border-white text-white w-[40%]'
                            placeholder='Indica el talle del producto'
                        />
                        <input
                            {...register(`sizes.${index}.stock` as const)}
                            className='bg-zinc-700 p-2 rounded-xl border-1 border-white text-white w-[40%]'
                            placeholder='Indica la cantidad de unidades'
                        />
                        <button 
                            onClick={() => removeSize(index)} 
                            type='button' 
                            className='cursor-pointer bg-green-700 p-2 rounded-xl text-white font-semibold hover:bg-green-900 w-[20%]'
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
                <button 
                    type='button' 
                    onClick={() => appendSize({ size: 0, stock: 0 })}
                    className='cursor-pointer bg-green-700 p-2 rounded-xl text-white font-semibold hover:bg-green-900'
                >
                    + Agregar talle
                </button>
                {errors.sizes && <p className='text-red-500'>Campo requerido</p>}
            </div>

            <div className='flex flex-col items-start gap-4'>
                <label>Imágenes:</label>
                <input 
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='cursor-pointer bg-green-700 p-2 rounded-xl text-white font-semibold hover:bg-green-900'
                />
                {uploading && (
                    <div>
                        <HashLoader size={80} color="#008236" />
                        <p>Subiendo imagen</p>
                    </div>
                )}

                {imageFields.map((field, index) => (
                    <div 
                    key={field.id} 
                    className="w-full flex justify-start gap-5 my-4"
                    >
                        <input
                            placeholder="URL"
                            {...register(`images.${index}.url` as const)}
                            className='bg-zinc-700 p-2 rounded-xl border-1 border-white text-white w-[40%]'
                        />
                        <input
                            placeholder="Texto alternativo"
                            {...register(`images.${index}.alt` as const)}
                            className='bg-zinc-700 p-2 rounded-xl border-1 border-white text-white w-[40%]'
                        />
                        <button 
                            type="button" 
                            onClick={() => removeImage(index)}
                            className='cursor-pointer bg-green-700 p-2 rounded-xl text-white font-semibold hover:bg-green-900 w-[20%]'
                        >
                            Eliminar
                        </button>
                    </div>
                ))}

                <button 
                    type="button" 
                    onClick={() => appendImage({ url: '', alt: '' })}
                    className='cursor-pointer bg-green-700 p-2 rounded-xl text-white font-semibold hover:bg-green-900'
                >
                    + Agregar imagen manualmente
                </button>

                {errors.images && <p className='text-red-500'>Campo requerido</p>}
            </div>

            <button 
                type="submit"
                className='cursor-pointer bg-green-700 p-2 rounded-xl w-full text-white font-semibold hover:bg-green-900'
            >
                {initialData ? 'Actualizar' : 'Crear'}
            </button>
        </form>
    )
}