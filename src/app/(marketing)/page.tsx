import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import IndustriesSection from "./sections/IndustriesSection";
import PricingSection from "./sections/PricingSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";

export default function MarketingPage() {
  return (
    <>
        <Navbar />
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <IndustriesSection />
      <PricingSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}