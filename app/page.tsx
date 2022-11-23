import HomeSection from './(components)/HomeSection';
import Navbar from './(components)/Navbar';
import AboutSection from './(components)/AboutSection';
import ContactSection from './(components)/ContactSection';

export default function FullPage() {
  return (
    <div>
      <HomeSection />
      <div>
        <Navbar />
        <AboutSection />
        <ContactSection />
      </div>
    </div>
  );
}
