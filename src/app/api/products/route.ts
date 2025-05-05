import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";

export async function GET() {
    try {
        await connectDB();
        const products = await Product.find();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error in GET /api/products:', error);
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const newProduct = new Product(body);
        const savedProduct = await newProduct.save();
        return NextResponse.json(savedProduct, {status: 201});
    } catch {
        return NextResponse.json({error: 'Error creating product'}, {status: 500});
    }
}