'use client';

import { motion } from 'framer-motion';

export default function HowItWorks() {
    const steps = [
        {
            number: '01',
            title: 'Upload Your Image',
            description: 'Simply drag and drop or click to upload your image. We support JPG, PNG, WEBP, and HEIC formats up to 10MB.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            ),
        },
        {
            number: '02',
            title: 'Choose Upscale Level',
            description: 'Select your desired upscaling level - 2x, 4x, or up to 8x. Our AI automatically enhances clarity, sharpness, and details in seconds.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            ),
        },
        {
            number: '03',
            title: 'Download Enhanced Image',
            description: 'Once the upscaling is complete, simply download your high-resolution image. Ready to use for any purpose!',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            ),
        },
    ];

    return (
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
                        Steps to <span className="gradient-text">Upscale & Enhance</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Three simple steps to transform your images from low to high resolution
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gray-100 -z-10 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-blue-300 to-transparent"
                                        initial={{ x: '-100%' }}
                                        whileInView={{ x: '100%' }}
                                        transition={{ duration: 1.5, delay: index * 0.3, repeat: Infinity, repeatDelay: 1 }}
                                    />
                                </div>
                            )}

                            {/* Card */}
                            <motion.div
                                className="relative bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                whileHover={{ y: -10 }}
                            >
                                {/* Number Badge */}
                                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-2xl font-bold text-white">{step.number}</span>
                                </div>

                                {/* Icon */}
                                <motion.div
                                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white mb-6"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    {step.icon}
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* CTA Below */}
                <div className="text-center mt-16">
                    <button className="btn-primary">
                        Try It Now - It&apos;s Free
                    </button>
                </div>
            </div>
        </section>
    );
}
