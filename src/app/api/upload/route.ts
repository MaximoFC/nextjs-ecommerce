import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const POST = async (req: Request) => {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: 'Image not found' }, {status: 400});
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const mime = file.type;
    const dataUri = `data:${mime};base64,${base64}`;

    try {
        const res = await cloudinary.uploader.upload(dataUri, {
            folder: 'nextjs-ecommerce'
        });

        return NextResponse.json({ url: res.secure_url });
    } catch (error) {
        return NextResponse.json({ error: error }, {status: 500});
    }
}