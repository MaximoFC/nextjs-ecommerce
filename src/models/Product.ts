import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    sizes: [{ 
        size: { type: Number, required: true },
        stock: { type: Number, required: true }
    }],
    images: [{
        url: { type: String, required: true },
        alt: { type: String }
    }],
    discount: { type: Number, required: true, default: 0 },
    isFeatured: { type: Boolean, required: false },
    isActive: { type: Boolean, required: true, default: true }
}, {
    timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema);
