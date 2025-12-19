'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
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

export default function UpgradeNotice() {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16 px-4">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Want More Power?
                </h2>
                <p className="text-xl mb-8 text-blue-100">
                    Upgrade features coming soon!
                </p>

                <motion.div
                    className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl"
                        variants={fadeInUp}
                        whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                    >
                        <h3 className="text-xl font-bold mb-2">Batch Processing</h3>
                        <p className="text-blue-100 text-sm">
                            Upload and enhance multiple images at once
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl"
                        variants={fadeInUp}
                        whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                    >
                        <h3 className="text-xl font-bold mb-2">Advanced Editor</h3>
                        <p className="text-blue-100 text-sm">
                            Fine-tune clarity, sharpness, and color enhancement
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl"
                        variants={fadeInUp}
                        whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                    >
                        <h3 className="text-xl font-bold mb-2">16K Resolution</h3>
                        <p className="text-blue-100 text-sm">
                            Ultra-high resolution for professional printing
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <motion.button
                        className="btn-shine bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Notified When Available
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}
