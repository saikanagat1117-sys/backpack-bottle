import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ValueProp from "@/components/ValueProp";
import HowItWorks from "@/components/HowItWorks";
import Destinations from "@/components/Destinations";
import Comparison from "@/components/Comparison";
import Testimonials from "@/components/Testimonials";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ValueProp />
        <Destinations />
        <Comparison />
        <HowItWorks />
        <Testimonials />
        <SocialProof />
        <FAQ />
        <LeadForm />
        <Newsletter />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
