import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary';

export const dynamic = 'force-dynamic';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        // 1. Authenticate
        const session = await auth.api.getSession({
            headers: req.headers
        });
        const userId = session?.user?.id;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // 2. Parse File & Scale
        const formData = await req.formData();
        const file = formData.get('image');
        const scaleString = formData.get('scale') || '2';
        const scaleFactor = parseInt(scaleString, 10);

        if (!file) {
            return new NextResponse('No image provided', { status: 400 });
        }

        // 3. Check Credits
        const { data: user, error: fetchError } = await supabaseAdmin
            .from('user')
            .select('credits')
            .eq('id', userId)
            .single();

        if (fetchError || !user) {
            return new NextResponse('User not found', { status: 404 });
        }

        const currentCredits = user.credits || 0;

        if (currentCredits < 1) {
            return new NextResponse('Insufficient credits', { status: 402 });
        }

        // 4. Upload to Cloudinary
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'ai-upscaler',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        const originalWidth = uploadResult.width;
        const originalHeight = uploadResult.height;
        const targetWidth = originalWidth * scaleFactor;
        const targetHeight = originalHeight * scaleFactor;

        // 5. Generate Upscaled URL
        // We use "gen_restore" for quality restoration.
        // AND "scale" cropping to physically resize the image output.
        // Cloudinary processes transformations in order.
        const upscaledUrl = cloudinary.url(uploadResult.public_id, {
            transformation: [
                { effect: "gen_restore" },
                { width: targetWidth, height: targetHeight, crop: "scale" }
            ],
            secure: true
        });

        // 6. Deduct 1 credit (Only if we reached here successfully)
        const { error: updateError } = await supabaseAdmin
            .from('user')
            .update({ credits: currentCredits - 1 })
            .eq('id', userId);

        if (updateError) {
            console.error('Error deducting credit:', updateError);
            // In a real prod app, you might want to retry or alert admin.
        }

        return NextResponse.json({
            success: true,
            remaining: currentCredits - 1,
            imageUrl: upscaledUrl,
            originalUrl: uploadResult.secure_url,
            originalWidth,
            originalHeight,
            targetWidth,
            targetHeight, // Accurate dimensions
            scaleFactor
        });

    } catch (error) {
        console.error('Upscale Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
