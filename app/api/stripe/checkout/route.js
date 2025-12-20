import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const authSession = await auth.api.getSession({
            headers: req.headers
        });
        const userId = authSession?.user?.id;

        if (!userId) return new NextResponse('Unauthorized', { status: 401 });

        const { amount, price } = await req.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${amount} Credits`,
                            description: 'AI Upscaler Credits',
                        },
                        unit_amount: Math.round(price * 100), // cents
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId: userId,
                credits: amount,
            },
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 });
    }
}
