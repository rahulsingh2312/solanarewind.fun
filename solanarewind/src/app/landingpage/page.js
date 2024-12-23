import Footer from "./Footer";
import Hero from "./Hero";
import SectionFive from "./SectionFive";
import SectionFour from "./SectionFour";
import SectionThree from "./SectionThree";
import SectionTwo from "./SectionTwo";

export default function Home() {
  return (
    <main>
      <Hero />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <Footer />
    </main>
  );
}
