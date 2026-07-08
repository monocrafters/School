import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import HomeSections from "@/components/home/HomeSections";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HomeSections />
      </main>
      <Footer />
    </>
  );
}
