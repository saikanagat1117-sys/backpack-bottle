import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ValueProp from "@/components/ValueProp";
import HowItWorks from "@/components/HowItWorks";
import Destinations from "@/components/Destinations";
import SocialProof from "@/components/SocialProof";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ValueProp />
        <Destinations />
        <HowItWorks />
        <SocialProof />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
