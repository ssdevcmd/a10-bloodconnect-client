import Banner from "@/components/Banner";
import ContactSection from "@/components/ContactSection";
import FeaturedSection from "@/components/FeaturedSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Banner />
      <FeaturedSection />
      <ContactSection />
    </>
  );
}
