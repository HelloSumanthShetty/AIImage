'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import LoginModal from './LoginModal';
import PricingModal from './PricingModal';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useUser();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isPricingOpen, setIsPricingOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-md">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold gradient-text">AI Upscaler</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
                            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">How it Works</a>
                            <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">FAQ</a>

                            {user ? (
                                <div className="flex items-center gap-4">
                                    <div
                                        onClick={() => setIsPricingOpen(true)}
                                        className="cursor-pointer bg-blue-50 px-4 py-2 rounded-full flex items-center gap-2 border border-blue-100 hover:bg-blue-100 transition-colors"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="font-semibold text-blue-800 text-sm">{user.credits} Credits</span>
                                        <span className="text-xs text-blue-500 font-medium ml-1 flex items-center">
                                            + Buy
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
                                        <Image
                                            src={user.avatar}
                                            alt="User"
                                            width={32}
                                            height={32}
                                            className="rounded-full border border-gray-200"
                                        />
                                        <button
                                            onClick={logout}
                                            className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsLoginOpen(true)}
                                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                    Get Started
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden py-4 space-y-3 border-t border-gray-200">
                            <a href="#features" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
                            <a href="#how-it-works" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">How it Works</a>
                            <a href="#faq" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">FAQ</a>
                            {user ? (
                                <div className="space-y-3 pt-3 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-gray-700">Credits: {user.credits}</span>
                                        <button onClick={() => setIsPricingOpen(true)} className="text-blue-600 text-sm font-bold">Buy More</button>
                                    </div>
                                    <button onClick={logout} className="text-red-500 font-medium block w-full text-left">Logout</button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsLoginOpen(true)}
                                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold"
                                >
                                    Get Started
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
        </>
    );
}
