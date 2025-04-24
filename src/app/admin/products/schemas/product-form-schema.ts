import * as z from 'zod';

export const productFormSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    brand: z.string().min(1),
    price: z.coerce.number().min(0),
    category: z.string().min(1),
    discount: z.coerce.number().min(0).max(100),
    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
    sizes: z.array(z.object({
        size: z.coerce.number().min(1),
        stock: z.coerce.number().min(1)
    })),
    images: z.array(z.object({
        url: z.string().url(),
        alt: z.string().optional()
    }))
})

export type ProductFormSchema = z.infer<typeof productFormSchema>;