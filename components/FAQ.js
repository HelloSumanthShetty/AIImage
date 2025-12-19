'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'What is an AI image upscaler?',
            answer: 'An AI image upscaler uses artificial intelligence and machine learning to increase the resolution of images while maintaining or improving quality. Unlike traditional upscaling that simply stretches pixels, AI upscaling intelligently adds detail and sharpness.',
        },
        {
            question: 'How much can I upscale my images?',
            answer: 'You can upscale your images up to 8x their original resolution. We offer 2x, 4x, and 8x upscaling options. For example, a 500x500 pixel image can be enlarged to 4000x4000 pixels with 8x upscaling.',
        },
        {
            question: 'What file formats are supported?',
            answer: 'We support all major image formats including JPG, JPEG, PNG, WEBP, and HEIC. You can upload files up to 10MB in size.',
        },
        {
            question: 'Is the upscaling really free?',
            answer: 'Yes! Our AI image upscaler is completely free to use. There are no hidden fees, watermarks, or limitations on the number of images you can enhance.',
        },
        {
            question: 'How long does it take to upscale an image?',
            answer: 'Most images are processed in less than 10 seconds, depending on the file size and upscaling level selected. Our AI-powered servers are optimized for speed.',
        },
        {
            question: 'Will upscaling reduce image quality?',
            answer: 'No! Our AI technology is designed to enhance image quality while increasing resolution. It intelligently adds detail, reduces noise, and maintains sharpness to deliver professional results.',
        },
        {
            question: 'Can I upscale multiple images at once?',
            answer: 'Yes! Our batch upscaling feature allows you to process multiple images simultaneously, saving you time and effort. Perfect for e-commerce, photography, and content creation.',
        },
        {
            question: 'Is my data safe and private?',
            answer: 'Absolutely. We take privacy seriously. Your uploaded images are processed securely and are automatically deleted from our servers after processing. We never store or share your images.',
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        Everything you need to know about our AI image upscaler
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-lg font-semibold text-gray-900 pr-8">
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-blue-600 rotate-180' : ''}`}>
                                    <svg
                                        className={`w-5 h-5 transition-colors ${openIndex === index ? 'text-white' : 'text-blue-600'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>

                            {/* Answer */}
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="mt-16 text-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Still have questions?</h3>
                    <p className="text-gray-600 mb-6">
                        Feel free to reach out to our support team
                    </p>
                    <motion.button
                        className="btn-secondary btn-shine"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Contact Support
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
