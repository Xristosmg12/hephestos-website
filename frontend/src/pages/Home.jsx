import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Preloader } from "../components/site/Preloader";
import { Navbar } from "../components/site/Navbar";
import { Hero } from "../components/site/Hero";
import { Services } from "../components/site/Services";
import { Industries } from "../components/site/Industries";
import { HowItWorks } from "../components/site/HowItWorks";
import { WhyHephestos } from "../components/site/WhyHephestos";
import { CaseStudies } from "../components/site/CaseStudies";
import { About } from "../components/site/About";
import { Contact } from "../components/site/Contact";
import { Footer } from "../components/site/Footer";

export default function Home() {
  const [ready, setReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Skip preloader if arriving with a hash (from another page)
    if (location.hash) {
      setReady(true);
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
    const t = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-[#080808] text-white antialiased">
      {!location.hash && <Preloader done={ready} />}
      <Navbar startDelay={ready ? 0.1 : 0} />
      <main>
        <Hero ready={ready} />
        <Services />
        <Industries />
        <HowItWorks />
        <WhyHephestos />
        <CaseStudies />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
