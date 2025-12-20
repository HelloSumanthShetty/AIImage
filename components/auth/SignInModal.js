'use client';

import { useState } from 'react';
import { signIn, signUp } from '@/lib/auth-client';
import { motion, AnimatePresence } from 'framer-motion';

export default function SignInModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const options = {
            email,
            password,
            callbackURL: '/',
            name, // passed for signup, ignored for signin usually
        };

        const callbacks = {
            onRequest: () => setIsLoading(true),
            onSuccess: () => {
                setIsLoading(false);
                onClose();
            },
            onError: (ctx) => {
                setIsLoading(false);
                setError(ctx.error.message);
            }
        };

        try {
            if (isSignUp) {
                await signUp.email({ ...options }, callbacks);
            } else {
                await signIn.email({ ...options }, callbacks);
            }
        } catch (err) {
            setIsLoading(false);
            setError(err.message || "An unexpected error occurred");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
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
                        className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl relative overflow-hidden"
                    >
                        <h2 className="text-3xl font-bold mb-2 text-center">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
                        <p className="text-gray-500 mb-6 text-center">
                            {isSignUp ? 'Sign up to start upscaling' : 'Sign in to your account'}
                        </p>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {isSignUp && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                    minLength={6}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-600">
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="ml-2 text-blue-600 font-semibold hover:underline"
                            >
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
