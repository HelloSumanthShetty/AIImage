import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const creditsToAdd = parseInt(session.metadata?.credits || '0');

        if (userId && creditsToAdd > 0) {
            try {
                // Fetch current credits
                const { data: user, error: fetchError } = await supabaseAdmin
                    .from('user')
                    .select('credits')
                    .eq('id', userId)
                    .single();

                if (fetchError) throw fetchError;

                const newBalance = (user?.credits || 0) + creditsToAdd;

                // Update credits
                const { error: updateError } = await supabaseAdmin
                    .from('user')
                    .update({ credits: newBalance })
                    .eq('id', userId);

                if (updateError) throw updateError;

                console.log(`Updated credits for user ${userId}: +${creditsToAdd}`);
            } catch (error) {
                console.error('Error updating user credits in Supabase:', error);
                return new NextResponse('Error updating credits', { status: 500 });
            }
        }
    }

    return new NextResponse(null, { status: 200 });
}
