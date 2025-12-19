import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustedBy from '@/components/TrustedBy';
import ShowcaseStrip from '@/components/ShowcaseStrip';
import ImageShowcase from '@/components/ImageShowcase';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import FAQ from '@/components/FAQ';
import UpgradeNotice from '@/components/UpgradeNotice';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <TrustedBy />
            <ShowcaseStrip />
            <ImageShowcase />
            <HowItWorks />
            <Features />
            <FAQ />
            <UpgradeNotice />
            <Footer />
        </main>
    );
}
