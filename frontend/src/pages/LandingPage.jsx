import AccuracySection from '../features/landing/components/AccuracySection';
import HeroSection from '../features/landing/components/HeroSection';
import HowItWorksSection from '../features/landing/components/HowItWorksSection';
import LandingFooter from '../features/landing/components/LandingFooter';
import MaterialsSection from '../features/landing/components/MaterialsSection';
import PublicHeader from '../features/landing/components/PublicHeader';

export default function LandingPage() {
  return (
    <main className="overflow-hidden bg-white">
      <PublicHeader />
      <HeroSection />
      <HowItWorksSection />
      <MaterialsSection />
      <AccuracySection />
      <LandingFooter />
    </main>
  );
}
