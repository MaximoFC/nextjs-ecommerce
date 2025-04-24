'use client';

import { productFormSchema, ProductFormSchema } from '../schemas/product-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';

type ProductFormProps = {
    initialData?: ProductFormSchema;
    onSubmit: (data: ProductFormSchema) => void;
}

export const ProductForm = ({ initialData, onSubmit }: ProductFormProps) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<ProductFormSchema>({
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
            images: [{ url: '', alt: '' }]
        }
    });

    const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
        control,
        name: 'sizes'
    });

    const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
        control,
        name: 'images'
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="">Título</label>
                <input {...register('title')} />
                {errors.title && <p className='text-red-500'>Campo requerido</p>}
            </div>
            
            <div>
                <label htmlFor="">Descripción</label>
                <textarea {...register('description')} />
                {errors.title && <p className='text-red-500'>Campo requerido</p>}
            </div>

            <div>
                <label>Marca</label>
                <input {...register('brand')} />
            </div>

            <div>
                <label>Precio</label>
                <input type="number" {...register('price')} />
            </div>

            <div>
                <label>Categoría</label>
                <input {...register('category')} />
            </div>

            <div>
                <label>Descuento (%)</label>
                <input type="number" {...register('discount')} />
            </div>

            <div>
                <label>Destacado</label>
                <input type="checkbox" {...register('isFeatured')} />
            </div>

            <div>
                <label>Activo</label>
                <input type="checkbox" {...register('isActive')} />
            </div>

            <div>
                <label htmlFor="">Talles:</label>
                {sizeFields.map((field, index) => (
                    <div key={field.id} >
                        <input 
                            {...register(`sizes.${index}.size` as const)}
                        />
                        <input
                            {...register(`sizes.${index}.stock` as const)}
                        />
                        <button onClick={() => removeSize(index)} type='button' >Eliminar</button>
                    </div>
                ))}
                <button type='button' onClick={() => appendSize({ size: 0, stock: 0 })}>+ Agregar talle</button>
            </div>

            <div>
                <label className="font-semibold">Imágenes:</label>
                {imageFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                        <input
                            placeholder="URL"
                            {...register(`images.${index}.url` as const)}
                        />
                        <input
                            placeholder="Texto alternativo"
                            {...register(`images.${index}.alt` as const)}
                        />
                        <button type="button" onClick={() => removeImage(index)}>Eliminar</button>
                    </div>
                ))}
                <button type="button" onClick={() => appendImage({ url: '', alt: '' })}>+ Agregar imagen</button>
            </div>

            <button type="submit">
                {initialData ? 'Actualizar' : 'Crear'}
            </button>
        </form>
    )
}