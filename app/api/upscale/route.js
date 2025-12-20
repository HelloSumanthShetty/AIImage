import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';

export async function POST(req) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        });
        const userId = session?.user?.id;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Check credits in Supabase
        const { data: user, error: fetchError } = await supabaseAdmin
            .from('user')
            .select('credits')
            .eq('id', userId)
            .single();

        if (fetchError || !user) {
            console.error('Error fetching user credits:', fetchError);
            return new NextResponse('User not found', { status: 404 });
        }

        const currentCredits = user.credits || 0;

        if (currentCredits < 1) {
            return new NextResponse('Insufficient credits', { status: 402 });
        }

        // Deduct 1 credit
        const { error: updateError } = await supabaseAdmin
            .from('user')
            .update({ credits: currentCredits - 1 })
            .eq('id', userId);

        if (updateError) {
            console.error('Error deducting credit:', updateError);
            return new NextResponse('Failed to process credits', { status: 500 });
        }

        return new NextResponse(JSON.stringify({ success: true, remaining: currentCredits - 1 }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Upscale Auth Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
