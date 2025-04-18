import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    try {
        await connectDB();
        const { id } = await context.params;
        const product = await Product.findById(id);

        if (!product) return NextResponse.json({error: 'Product not found'}, {status: 404});
        return NextResponse.json(product);
    } catch {
        return NextResponse.json({error: 'Error fetching product'}, {status: 500});
    }
}

export async function PUT(req: NextRequest, context: { params: {id: string} }) {
    try {
        await connectDB();
        const body = await req.json();
        const { id } = await context.params;
        const updated = await Product.findByIdAndUpdate(id, body, {new: true});
        if (!updated) return NextResponse.json({error: 'Product not found'}, {status: 404});
        return NextResponse.json(updated);
    } catch {
        return NextResponse.json({error: 'Error updating product'}, {status: 500});
    }
}

export async function DELETE(_: NextRequest, context: { params: { id: string } }) {
    try {
        await connectDB();
        const { id } = await context.params;
        const deleted = await Product.findByIdAndDelete(id);

        if (!deleted) return NextResponse.json({error: 'Product not found'}, {status:404});

        return NextResponse.json({message: 'Product deleted'});
    } catch {
        return NextResponse.json({error: 'Error deleting product'}, {status: 500});
    }
}