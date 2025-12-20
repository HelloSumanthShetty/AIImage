import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';

export async function GET(req) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        });
        const userId = session?.user?.id;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { data: user, error } = await supabaseAdmin
            .from('user')
            .select('credits')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching credits:', error);
            return new NextResponse('Error', { status: 500 });
        }

        return NextResponse.json({ credits: user?.credits || 0 });
    } catch (error) {
        console.error('Credits API Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
