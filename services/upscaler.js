// Mock Upscaling Service
// This simulates an AI upscaling API. Replace with real API when ready.

const CONFIG = {
    // Change this image URL to test with different results
    MOCK_UPSCALED_IMAGE: '/images/portrait-after.png',

    // Simulated processing delay (in milliseconds)
    PROCESSING_DELAY: 3000,

    // Maximum file size (10MB)
    MAX_FILE_SIZE: 10 * 1024 * 1024,

    // Supported formats
    SUPPORTED_FORMATS: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/heic'],
};

class UpscalerService {
    /**
     * Validate uploaded image
     */
    validateImage(file) {
        const errors = [];

        if (!file) {
            errors.push('No file provided');
            return { valid: false, errors };
        }

        // Check file type
        if (!CONFIG.SUPPORTED_FORMATS.includes(file.type)) {
            errors.push(`Unsupported format. Please use: ${CONFIG.SUPPORTED_FORMATS.join(', ')}`);
        }

        // Check file size
        if (file.size > CONFIG.MAX_FILE_SIZE) {
            errors.push(`File too large. Maximum size is ${CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB`);
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Mock upscale function
     * In production, replace this with actual API call to:
     * - Replicate API (Real-ESRGAN)
     * - Clipdrop API
     * - Fal.ai
     * - Or any other upscaling service
     */
    async upscaleImage(file, scaleFactor = 4) {
        // Validate before processing
        const validation = this.validateImage(file);
        if (!validation.valid) {
            throw new Error(validation.errors.join(', '));
        }

        try {
            // Simulate API processing delay
            await new Promise(resolve => setTimeout(resolve, CONFIG.PROCESSING_DELAY));

            // In a real implementation, you would:
            // 1. Upload the image to the API
            // 2. Wait for processing
            // 3. Get the upscaled image URL

            // For now, return mock data
            const originalDimensions = await this.getImageDimensions(file);
            const objectUrl = URL.createObjectURL(file);

            return {
                success: true,
                originalImage: objectUrl,
                upscaledImage: objectUrl, // Use same image for now
                originalDimensions,
                upscaledDimensions: {
                    width: originalDimensions.width * scaleFactor,
                    height: originalDimensions.height * scaleFactor
                },
                scaleFactor,
                processingTime: CONFIG.PROCESSING_DELAY,
            };
        } catch (error) {
            throw new Error(`Upscaling failed: ${error.message}`);
        }
    }

    /**
     * Get image dimensions from file
     */
    getImageDimensions(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const url = URL.createObjectURL(file);

            img.onload = () => {
                URL.revokeObjectURL(url);
                resolve({
                    width: img.width,
                    height: img.height
                });
            };

            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Failed to load image'));
            };

            img.src = url;
        });
    }

    /**
     * Download upscaled image
     */
    async downloadImage(imageUrl, filename = 'upscaled-image.png') {
        try {
            // For mock images or same-origin images
            if (imageUrl.startsWith('/') || imageUrl.startsWith(window.location.origin)) {
                const link = document.createElement('a');
                link.href = imageUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return;
            }

            // For external URLs, fetch and download
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        } catch (error) {
            throw new Error(`Download failed: ${error.message}`);
        }
    }
}

// Export singleton instance
export const upscalerService = new UpscalerService();
export { CONFIG };
