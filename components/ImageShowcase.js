'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageShowcase() {
    const [activeTab, setActiveTab] = useState('people');
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const examples = {
        people: {
            title: 'People & Portraits',
            description: 'Perfect for enhancing family photos, professional headshots, and vintage portraits',
            image: '/images/portrait-after.png',
        },
        products: {
            title: 'Product Photography',
            description: 'Ideal for e-commerce, catalogs, and product listings that need crystal clear images',
            image: '/images/product-after.png',
        },
    };

    const tabs = [
        { id: 'people', label: 'People' },
        { id: 'products', label: 'Products' },
    ];

    const currentExample = examples[activeTab];

    const handleMove = (e) => {
        if (!isDragging && e.type !== 'click') return;

        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();
        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const position = (x / rect.width) * 100;
        setSliderPosition(Math.min(Math.max(position, 0), 100));
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
                        An All-in-One Solution for <span className="gradient-text">Image Enhancement</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Drag the slider to compare original vs AI-enhanced images
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${activeTab === tab.id
                                ? 'text-white'
                                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md'
                                }`}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <motion.div
                    className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="text-center mb-8"
                        >
                            <h3 className="text-3xl font-bold mb-3">{currentExample.title}</h3>
                            <p className="text-gray-600 text-lg">{currentExample.description}</p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Interactive Slider Comparison */}
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            layoutId={`image-${activeTab}`}
                            className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
                            onMouseMove={handleMove}
                            onTouchMove={handleMove}
                            onMouseDown={() => setIsDragging(true)}
                            onMouseUp={() => setIsDragging(false)}
                            onMouseLeave={() => setIsDragging(false)}
                            onClick={handleMove}
                        >
                            {/* After Image (Background - High Quality) */}
                            <div className="absolute inset-0">
                                <Image
                                    src={currentExample.image}
                                    alt="After AI Enhancement"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                    priority
                                />
                            </div>

                            {/* Before Image (Overlay with degradation filters) */}
                            <div
                                className="absolute inset-0"
                                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                            >
                                <Image
                                    src={currentExample.image}
                                    alt="Before AI Enhancement"
                                    fill
                                    className="object-cover"
                                    style={{
                                        filter: 'blur(3px) brightness(0.85) contrast(0.8) saturate(0.7)',
                                        imageRendering: 'pixelated'
                                    }}
                                    unoptimized
                                    priority
                                />
                            </div>

                            {/* Slider Line */}
                            <div
                                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-10"
                                style={{ left: `${sliderPosition}%` }}
                            >
                                {/* Slider Handle */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center cursor-ew-resize border-4 border-blue-500">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                    </svg>
                                </div>
                            </div>

                            {/* Labels */}
                            <div className="absolute top-6 left-6 bg-red-500/90 backdrop-blur-sm text-white px-5 py-3 rounded-xl font-bold text-lg shadow-lg">
                                Before
                            </div>
                            <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-600 to-cyan-600 backdrop-blur-sm text-white px-5 py-3 rounded-xl font-bold text-lg shadow-lg">
                                After
                            </div>

                            {/* Mobile Hint */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium md:hidden">
                                Swipe to compare
                            </div>
                        </motion.div>

                        {/* Instructions */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600 flex items-center justify-center gap-2">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Drag the slider or click anywhere to compare
                            </p>
                        </div>
                    </div>
                </motion.div>      {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                        <div className="text-3xl font-bold gradient-text mb-2">8x</div>
                        <div className="text-sm text-gray-600 font-medium">Upscaling</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                        <div className="text-3xl font-bold gradient-text mb-2">&lt;10s</div>
                        <div className="text-sm text-gray-600 font-medium">Processing</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                        <div className="text-3xl font-bold gradient-text mb-2">100%</div>
                        <div className="text-sm text-gray-600 font-medium">Free</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
