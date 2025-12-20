'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ResultDisplay({ result, onDownload, onReset }) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const [showComparison, setShowComparison] = useState(true);
    const [upscaledSize, setUpscaledSize] = useState(null);

    // Fetch upscaled image size
    useEffect(() => {
        if (result?.upscaledImage) {
            fetch(result.upscaledImage, { method: 'HEAD' })
                .then(res => {
                    const size = res.headers.get('content-length');
                    if (size) setUpscaledSize(parseInt(size, 10));
                })
                .catch(err => console.error('Failed to get file size', err));
        }
    }, [result]);

    const handleMove = (e) => {
        if (!isDragging && e.type !== 'click') return;

        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();
        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const position = (x / rect.width) * 100;
        setSliderPosition(Math.min(Math.max(position, 0), 100));
    };

    const handleDownload = () => {
        const filename = `upscaled-${result.scaleFactor}x-${Date.now()}.png`;
        onDownload(result.upscaledImage, filename);
    };

    const formatBytes = (bytes) => {
        if (!bytes) return '...';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="max-w-6xl mx-auto mt-12">
            {/* Success Message */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-2xl mb-8 animate-fade-in">
                <div className="flex items-center">
                    <svg className="w-8 h-8 text-green-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <h3 className="text-lg font-bold text-green-900">Image Successfully Upscaled!</h3>
                        <p className="text-green-700">Your image has been enhanced to {result.scaleFactor}x the original resolution</p>
                    </div>
                </div>
            </div>

            {/* View Toggle */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => setShowComparison(true)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${showComparison
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                        }`}
                >
                    Slider Comparison
                </button>
                <button
                    onClick={() => setShowComparison(false)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${!showComparison
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                        }`}
                >
                    Side by Side
                </button>
            </div>

            {showComparison ? (
                /* Slider Comparison */
                <div>
                    {/* Stats Header */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                        <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                            <p className="text-sm text-red-600 font-bold mb-1">Original Size</p>
                            <p className="text-gray-500 text-xs font-mono">{formatBytes(result.originalSize)}</p>
                            <p className="text-gray-400 text-[10px] mt-1">{result.originalDimensions.width} x {result.originalDimensions.height}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                            <p className="text-sm text-blue-600 font-bold mb-1">Enhanced Size</p>
                            <p className="text-gray-500 text-xs font-mono">{formatBytes(upscaledSize)}</p>
                            <p className="text-gray-400 text-[10px] mt-1">{result.upscaledDimensions.width} x {result.upscaledDimensions.height}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-2xl p-8">
                        <div
                            className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl cursor-ew-resize select-none"
                            onMouseMove={handleMove}
                            onTouchMove={handleMove}
                            onMouseDown={() => setIsDragging(true)}
                            onMouseUp={() => setIsDragging(false)}
                            onMouseLeave={() => setIsDragging(false)}
                            onClick={handleMove}
                        >
                            {/* After Image (Enhanced) */}
                            <Image
                                src={result.upscaledImage}
                                alt="Enhanced Image"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 100vw"
                                unoptimized
                            />

                            {/* Before Image (Original) NO BLUR */}
                            <div
                                className="absolute inset-0"
                                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                            >
                                <Image
                                    src={result.originalImage}
                                    alt="Original Image"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 100vw"
                                />
                            </div>

                            {/* Slider Line */}
                            <div
                                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-10"
                                style={{ left: `${sliderPosition}%` }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-blue-500">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                    </svg>
                                </div>
                            </div>

                            {/* Labels */}
                            <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                                Original
                            </div>
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                                Enhanced
                            </div>
                        </div>

                        <p className="text-center text-gray-600 mt-4">
                            <svg className="w-5 h-5 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Drag the slider to compare original vs enhanced
                        </p>
                    </div>
                </div>
            ) : (
                /* Side by Side Comparison */
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-bold text-red-600">Original</h4>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 font-mono">{formatBytes(result.originalSize)}</span>
                        </div>
                        <Image
                            src={result.originalImage}
                            alt="Original"
                            width={result.originalDimensions.width}
                            height={result.originalDimensions.height}
                            className="w-full h-auto rounded-lg shadow-md"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <p className="text-sm text-gray-600 mt-3 text-center">
                            {result.originalDimensions.width} × {result.originalDimensions.height}px
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-bold gradient-text">Enhanced ({result.scaleFactor}x)</h4>
                            <span className="text-xs bg-blue-50 px-2 py-1 rounded text-blue-600 font-mono">{formatBytes(upscaledSize)}</span>
                        </div>
                        <Image
                            src={result.upscaledImage}
                            alt="Enhanced"
                            width={result.upscaledDimensions.width}
                            height={result.upscaledDimensions.height}
                            className="w-full h-auto rounded-lg shadow-md"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            unoptimized
                        />
                        <p className="text-sm text-blue-600 font-semibold mt-3 text-center">
                            {result.upscaledDimensions.width} × {result.upscaledDimensions.height}px
                        </p>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button
                    onClick={handleDownload}
                    className="btn-primary flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Enhanced Image
                </button>
                <button
                    onClick={onReset}
                    className="btn-secondary flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Upscale Another Image
                </button>
            </div>
        </div>
    );
}
