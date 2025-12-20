'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PaymentSuccessPage() {
    const router = useRouter();

    useEffect(() => {
        // Optional: Confetti or sound effect here
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center"
            >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-8">
                    Your credits have been added to your account. You can now continue enhancing your images.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/"
                        className="block w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
