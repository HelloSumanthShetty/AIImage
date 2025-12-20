'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useCredits } from '@/hooks/useCredits'; // Import hook

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { upscalerService } from '@/services/upscaler';
import ResultDisplay from './ResultDisplay';
import { useSession, signIn } from '@/lib/auth-client';
// import LoginModal from './auth/SignInModal';
import PricingModal from './PricingModal';
import SignInModal from './auth/SignInModal';

// Animation variants
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

export default function Hero() {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [scaleFactor, setScaleFactor] = useState(4);
    const [processing, setProcessing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    const { data: session } = useSession();
    const { credits, updateCredits } = useCredits(); // Use hook
    const user = session?.user;
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isPricingOpen, setIsPricingOpen] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        setError(null);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setError(null);
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };

    const handleFileSelect = (file) => {
        // Validate file
        const validation = upscalerService.validateImage(file);
        if (!validation.valid) {
            setError(validation.errors.join(', '));
            setSelectedFile(null);
            return;
        }
        setSelectedFile(file);
    };

    const handleUpscale = async () => {
        if (!selectedFile) return;

        // AUTH & CREDIT CHECK
        if (!user) {
            setIsLoginOpen(true);
            return;
        }

        if (credits <= 0) {
            setIsPricingOpen(true);
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            const upscaleResult = await upscalerService.upscaleImage(selectedFile, scaleFactor);
            setResult(upscaleResult);

            // Update credits directly from result
            if (upscaleResult.remainingCredits !== undefined) {
                updateCredits(upscaleResult.remainingCredits);
            }

            // Optionally refresh session too
            router.refresh();
        } catch (err) {
            setError(err.message);
        } finally {
            setProcessing(false);
        }
    };

    const handleDownload = async (imageUrl, filename) => {
        try {
            await upscalerService.downloadImage(imageUrl, filename);
        } catch (err) {
            setError(`Download failed: ${err.message}`);
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setResult(null);
        setError(null);
        setScaleFactor(4);
    };

    // If we have a result, show the result display
    if (result) {
        return (
            <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
                <div className="max-w-7xl mx-auto">
                    <ResultDisplay
                        result={result}
                        onDownload={handleDownload}
                        onReset={handleReset}
                    />
                </div>
            </section>
        );
    }

    return (
        <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
            {/* Background Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"
                />
            </div>

            <motion.div
                className="max-w-7xl mx-auto relative z-10"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                <div className="text-center mb-12">
                    {/* Badge */}
                    <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 relative overflow-hidden group">
                        <motion.div
                            className="absolute inset-0 bg-white/40"
                            initial={{ x: '-100%' }}
                            whileInView={{ x: '200%' }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                        />
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-semibold text-sm">AI-Powered Upscaling</span>
                    </motion.div>

                    {/* Typing Animation Greeting */}
                    <motion.div variants={fadeInUp} className="mb-4 h-8 flex justify-center items-center">
                        <TypeAnimation
                            sequence={[
                                'Enhance Your Memories',
                                2000,
                                'Restore Old Photos',
                                2000,
                                'Increase Image Quality',
                                2000,
                                'Professional Upscaling',
                                2000
                            ]}
                            wrapper="span"
                            speed={50}
                            style={{ fontSize: '1.2rem', fontWeight: '600', color: '#4B5563' }} // gray-600
                            repeat={Infinity}
                        />
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                        AI Image <br />
                        <span className="gradient-text">Upscaler & Photo Enhancer</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                        Increase image resolution with our advanced upscaling technology. Enhance photos up to <strong className="text-blue-600">8x</strong> without losing quality.
                    </motion.p>

                    {/* Error Display */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="max-w-2xl mx-auto mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"
                        >
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-700 font-medium">{error}</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Upload Area */}
                    <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
                        <motion.form
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className="mb-6"
                        >
                            <label
                                htmlFor="file-upload"
                                className={`
                  relative flex flex-col items-center justify-center w-full h-64 
                  border-3 border-dashed rounded-2xl cursor-pointer 
                  transition-all duration-300
                  ${dragActive
                                        ? 'border-blue-500 bg-blue-50 scale-105'
                                        : 'border-gray-300 bg-white hover:bg-gray-50 hover:border-blue-400'
                                    }
                  ${processing ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {/* Upload Icon */}
                                    <div className={`
                    w-20 h-20 mb-4 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${dragActive ? 'bg-blue-500 scale-110' : 'bg-blue-100'}
                    ${processing ? 'animate-pulse' : ''}
                  `}>
                                        <svg
                                            className={`w-10 h-10 ${dragActive ? 'text-white' : 'text-blue-600'}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>
                                    </div>

                                    {selectedFile ? (
                                        <div className="text-center">
                                            <div className="mb-3 p-3 bg-blue-50 rounded-xl inline-block">
                                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="mb-2 text-lg font-semibold text-blue-600">
                                                {selectedFile.name}
                                            </p>
                                            <p className="text-sm text-gray-500 mb-2">
                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                            {!processing && (
                                                <p className="text-sm text-gray-600">
                                                    Click to change or drag another file
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <p className="mb-2 text-lg font-semibold text-gray-700">
                                                <span className="text-blue-600">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-sm text-gray-500 mb-1">
                                                PNG, JPG, JPEG, WEBP or HEIC
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Maximum file size: 10MB
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleChange}
                                    disabled={processing}
                                />
                            </label>
                        </motion.form>

                        {/* Upscale Options */}
                        <motion.div
                            className="flex flex-wrap justify-center gap-4 mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {[
                                { value: 2, label: '2x Upscale' },
                                { value: 4, label: '4x Upscale' },
                                { value: 8, label: '8x Upscale' },
                            ].map((option) => (
                                <motion.button
                                    key={option.value}
                                    layout
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setScaleFactor(option.value)}
                                    disabled={processing}
                                    className={`
                                        px-6 py-3 rounded-xl font-semibold transition-colors duration-200
                                        ${scaleFactor === option.value
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                                            : 'bg-white border-2 border-blue-200 text-blue-700 hover:border-blue-500 hover:bg-blue-50'
                                        }
                                        ${processing ? 'opacity-50 cursor-not-allowed' : ''}
                                    `}
                                >
                                    {option.label}
                                    {scaleFactor === option.value && (
                                        <motion.div
                                            className="absolute inset-0 rounded-xl bg-white/10"
                                            layoutId="activeOption"
                                            initial={false}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Upscale Button */}
                        <motion.button
                            onClick={handleUpscale}
                            className="btn-primary w-full sm:w-auto relative btn-shine overflow-hidden"
                            disabled={!selectedFile || processing}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            variants={fadeInUp}
                        >
                            {processing ? (
                                <span className="flex items-center gap-3 justify-center">
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Upscaling Image...
                                </span>
                            ) : (
                                <span>
                                    {selectedFile ? `Upscale Image ${scaleFactor}x` : 'Select an Image First'}
                                </span>
                            )}
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
                    20%, 40%, 60%, 80% { transform: translateX(2px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
            <SignInModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
        </section>
    );
}
