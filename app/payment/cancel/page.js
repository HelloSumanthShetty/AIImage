'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PaymentCancelPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center"
            >
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
                <p className="text-gray-600 mb-8">
                    Your payment was cancelled. No charges were made.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/"
                        className="block w-full bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors"
                    >
                        Return Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
