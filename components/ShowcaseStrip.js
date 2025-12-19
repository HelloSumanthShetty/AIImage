'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ShowcaseStrip() {
    // Standardize items - no hardcoded 'compare' types anymore
    // The POSITION determines the style
    const initialItems = [
        { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400&auto=format&fit=crop', alt: 'Interior' }, // Alternative Interior
        { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', alt: 'Portrait' },
        { src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop', alt: 'Product' },
        { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop', alt: 'Fashion' },
        { src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop', alt: 'Model' },
        { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop', alt: 'Nature' }, // Alternative Nature
        { src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop', alt: 'Shoes' },
    ];

    const [items, setItems] = useState(initialItems);
    const [isEnhanced, setIsEnhanced] = useState(false);

    // Auto-Slide Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setItems(currentItems => {
                // Move first item to end (Slide Left effect)
                const [first, ...rest] = currentItems;
                return [...rest, first];
            });
            // Reset enhanced toggle briefly on slide to prevent jarring transition
            setIsEnhanced(false);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    // Auto-Toggle AI Effect for the center card
    useEffect(() => {
        const interval = setInterval(() => {
            setIsEnhanced(prev => !prev);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 overflow-hidden ">
            <div className="flex items-center justify-center gap-6 px-4 min-w-max mx-auto md:overflow-visible">
                <AnimatePresence mode="popLayout">
                    {items.map((item, index) => {
                        // The middle item (index 3) gets the spotlight
                        const isCenter = index === 3;

                        if (isCenter) {
                            return (
                                <motion.div
                                    layoutId={item.src} // Unique ID for smooth morphing
                                    key={item.src}
                                    className="relative w-80 h-[450px] rounded-3xl overflow-hidden shadow-2xl z-20 flex-shrink-0 border-4 border-white/50"
                                    initial={{ scale: 0.8, opacity: 0.5 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, type: "spring" }}
                                >
                                    <div className="absolute inset-0">
                                        <Image
                                            src={item.src}
                                            alt="Original"
                                            fill
                                            className={`object-cover transition-all duration-700 ${!isEnhanced ? 'blur-[1px] brightness-90 saturate-50' : ''}`}
                                            sizes="320px"
                                        />

                                        {/* Overlay for Enhanced State */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: isEnhanced ? 1 : 0 }}
                                            transition={{ duration: 0.8 }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={item.src}
                                                alt="AI Enhanced"
                                                fill
                                                className="object-cover"
                                                sizes="320px"
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Scanning Line */}
                                    <motion.div
                                        className="absolute top-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />

                                    {/* Label */}
                                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-max">
                                        <motion.div
                                            className={`px-4 py-2 rounded-full backdrop-blur-md font-bold text-sm shadow-lg flex items-center gap-2
                                                ${isEnhanced
                                                    ? 'bg-blue-600/90 text-white'
                                                    : 'bg-black/60 text-gray-200'
                                                }`}
                                            animate={{ y: isEnhanced ? [0, -2, 0] : 0 }}
                                        >
                                            {isEnhanced ? (
                                                <>
                                                    AI ENHANCED
                                                </>
                                            ) : 'ORIGINAL'}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        }

                        return (
                            <motion.div
                                layoutId={item.src}
                                key={item.src}
                                className="w-40 h-60 rounded-xl overflow-hidden grayscale brightness-50 contrast-125 opacity-40 flex-shrink-0"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className="object-cover"
                                    sizes="160px"
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </section>
    );
}
