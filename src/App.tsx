import { useState } from "react";

import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import Footer from "./components/Footer";

// ✅ Correct import (since file is directly inside pages)
import HostBasedProject from "./pages/HostBasedProject";

function App() {
  const [activePage, setActivePage] = useState<"home" | "host">("home");

  return (
    <div className="relative min-h-screen bg-secondary-bg font-inter">
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      <div className="relative z-10">

        {activePage === "home" && (
          <>
            <Hero />
            <About />
            <Skills />
            <Projects onViewHostProject={() => setActivePage("host")} />
            <Certifications />
            <Contact />
            <Resume />
            <Footer />
          </>
        )}

        {activePage === "host" && (
          <>
            <button
              onClick={() => setActivePage("home")}
              className="text-cyan-400 px-6 pt-6 hover:text-cyan-300 transition-colors"
            >
              ← Back to Home
            </button>

            <HostBasedProject />
          </>
        )}

      </div>
    </div>
  );
}

export default App;