import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata = {
    title: 'AI Image Upscaler & Photo Enhancer - Upscale Images up to 8x',
    description: 'Increase image resolution with our advanced upscaling technology, an AI-powered image upscaler & image enhancer, ideal for enhancing photos, e-commerce, portraits, and vintage scans.',
    keywords: 'AI image upscaler, photo enhancer, image enhancement, upscale photos, AI upscaling',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
