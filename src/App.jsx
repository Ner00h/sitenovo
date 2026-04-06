import CosmicBackground from './components/CosmicBackground';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import IndustrialProjects from './components/IndustrialProjects';
import PrinterProjects from './components/PrinterProjects';
import Capabilities from './components/Capabilities';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      {/* Interactive cursor */}
      <Cursor />

      {/* Three.js cosmic background - fixed */}
      <CosmicBackground />

      {/* Main layout */}
      <div className="app-layout">
        <Navbar />

        <main>
          <Hero />
          <div className="cosmic-divider" />
          <About />
          <div className="cosmic-divider" />
          <IndustrialProjects />
          <div className="cosmic-divider" />
          <PrinterProjects />
          <div className="cosmic-divider" />
          <Capabilities />
          <div className="cosmic-divider" />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
