import HomeSection from './(components)/HomeSection';
import Navbar from './(components)/Navbar';
import AboutSection from './(components)/AboutSection';
import PortfolioSection from './(components)/PortfolioSection';
import SkillsSection from './(components)/SkillsSection';
import ContactSection from './(components)/ContactSection';

export default function FullPage() {
  return (
    <div>
      <HomeSection />
      <main className="main-section-containers">
        <Navbar />
        <PortfolioSection />
        {/* @ts-expect-error Server Component */}
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
}
