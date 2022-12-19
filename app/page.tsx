import HomeSection from './(components)/HomeSection';
import Navbar from './(components)/Navbar';
import AboutSection from './(components)/AboutSection';
import PortfolioSection from './(components)/PortfolioSection';
import SkillsSection from './(components)/SkillsSection';
import ContactSection from './(components)/ContactSection';
import PocketBase from 'pocketbase';

const loginToPocketbase = async () => {
  const pb = new PocketBase(process.env.DB_HOST);

  return await pb.admins.authWithPassword(
    // @ts-ignore
    process.env.PB_EMAIL,
    process.env.PB_PASSWORD
  );
};

export default async function FullPage() {
  const authData = await loginToPocketbase();

  return (
    <div>
      <HomeSection />
      <main className="main-section-containers">
        <Navbar />
        {/* @ts-expect-error Server Component */}
        <PortfolioSection authData={authData} />
        {/* @ts-expect-error Server Component */}
        <SkillsSection authData={authData} />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
}
