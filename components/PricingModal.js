'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';

export default function PricingModal({ isOpen, onClose }) {
    const { addCredits } = useUser();
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePurchase = (amount, price) => {
        setProcessing(true);
        // Simulate Stripe processing
        setTimeout(() => {
            setProcessing(false);
            setSuccess(true);
            setTimeout(() => {
                addCredits(amount);
                setSuccess(false);
                onClose();
            }, 1500);
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
                        >
                            {!success ? (
                                <div className="p-8">
                                    {!processing ? (
                                        <>
                                            <div className="text-center mb-8">
                                                <h2 className="text-3xl font-bold mb-2">Get More Credits</h2>
                                                <p className="text-gray-500">Choose a package to continue upscaling</p>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="border-2 border-blue-600 bg-blue-50 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-blue-100 transition-colors">
                                                    <div>
                                                        <div className="font-bold text-lg text-blue-900">50 Credits</div>
                                                        <div className="text-blue-600 text-sm">Perfect for starters</div>
                                                    </div>
                                                    <div className="text-xl font-bold text-blue-700">$9.99</div>
                                                </div>
                                                <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between opacity-60">
                                                    <div>
                                                        <div className="font-bold text-lg">100 Credits</div>
                                                        <div className="text-gray-500 text-sm">Best Value</div>
                                                    </div>
                                                    <div className="text-xl font-bold">$14.99</div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handlePurchase(50, 9.99)}
                                                className="w-full mt-8 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg btn-shine"
                                            >
                                                Proceed to Checkout
                                            </button>
                                        </>
                                    ) : (
                                        <div className="py-12 text-center">
                                            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6" />
                                            <h3 className="text-xl font-bold mb-2">Processing Payment...</h3>
                                            <p className="text-gray-500">Connecting to Stripe Secure Checkout</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="py-12 text-center bg-green-50">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h3>
                                    <p className="text-green-600">50 Credits have been added to your account.</p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
