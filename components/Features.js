'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function Features() {
    const features = [
        {
            title: 'AI Upscaling',
            description: 'Enlarge images by 2x, 4x, or even 8x without quality loss. Our AI maintains sharpness and detail with no blur or distortion.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Photo Restoration',
            description: 'Automatically fix blur, scratches, and color fade using AI-powered enhancement. Perfect for restoring low-resolution images.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            gradient: 'from-teal-500 to-cyan-500',
        },
        {
            title: 'Detail-Safe Enhancement',
            description: 'Uses image-trained AI models to upscale while preserving textures, edges, and fine details for sharp, realistic results.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            title: 'Batch Upscaling',
            description: 'Process multiple images at once to save time. Great for creatives, e-commerce sellers, and marketers.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            gradient: 'from-orange-500 to-red-500',
        },
        {
            title: 'Multiple Formats Supported',
            description: 'Upload JPG, PNG, WEBP, HEIC, and more. Download in your preferred format with optimized quality.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            gradient: 'from-blue-500 to-indigo-500',
        },
        {
            title: 'Lightning Fast',
            description: 'Get your enhanced images in seconds, not minutes. Our optimized AI processes images at blazing speeds.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            gradient: 'from-yellow-500 to-orange-500',
        },
    ];

    return (
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
                        Features of <span className="gradient-text">AI Image Upscaler</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Powered by advanced AI technology to deliver professional-grade image enhancement
                    </p>
                </div>

                {/* Features Grid */}
                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl overflow-hidden"
                            variants={fadeInUp}
                            whileHover={{
                                y: -8,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                        >
                            {/* Background Gradient on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                            {/* Icon */}
                            <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                            {/* Decorative Element */}
                            <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-tl-full`} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="mt-16 text-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-white"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="text-3xl font-bold mb-4">Ready to enhance your images?</h3>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of users who trust our AI-powered upscaler
                    </p>
                    <motion.button
                        className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl btn-shine"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Started Free
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
