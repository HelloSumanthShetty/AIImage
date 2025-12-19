'use client';

import { motion } from 'framer-motion';

export default function TrustedBy() {
    // Placeholder logos - in a real app these would be SVGs
    const brands = [
        "Pixelbin", "Retail Brand", "Enterprise", "Digital Brand",
        "EPC", "Iksula", "Mufti", "Styched", "The Pant Project",
        "Bandel", "CRED", "BizzleLabs"
    ];

    // Duplicate the list to ensure seamless looping
    const scrollingBrands = [...brands, ...brands];

    return (
        <section className="bg-white py-12 border-b border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <p className="text-gray-500 font-medium">Trusted by retail brands, enterprises and digital brands</p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                {/* Gradient Masks for smooth fade out at edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />

                <motion.div
                    className="flex gap-16 whitespace-nowrap"
                    animate={{
                        x: ["0%", "-50%"]
                    }}
                    transition={{
                        duration: 30, // Adjust speed here (higher = slower)
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {scrollingBrands.map((brand, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center min-w-[150px] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                        >
                            <span className="text-2xl font-bold text-gray-400 font-sans tracking-tight">
                                {brand}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
