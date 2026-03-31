import HeroSection from './sections/HeroSection';
import InfoBar from './sections/InfoBar';
import AboutSection from './sections/AboutSection';
import NewsSection from './sections/NewsSection';
import DiscipleshipSection from './sections/DiscipleshipSection';
import MaterialsSection from './sections/MaterialsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InfoBar />
      {/* <AboutSection />
      <NewsSection /> */}
      <DiscipleshipSection />
      {/* <MaterialsSection /> */}
    </>
  );
}