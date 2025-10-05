import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import AboutSection from "@/components/AboutSection";
// Testimonials and Newsletter removed per design request

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <EventsSection />
        <GallerySection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
