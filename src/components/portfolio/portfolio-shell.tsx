import { AboutSection } from "./about-section";
import { ContactSection } from "./contact-section";
import { HeroSection } from "./hero-section";
import { InteractiveDesktop } from "./interactive-desktop";
import { ProjectsSection } from "./projects-section";
import { ResponsivePortfolio } from "./responsive-portfolio";
import { Sidebar } from "./sidebar";
import { SkillsSection } from "./skills-section";

export function PortfolioShell() {
  return (
    <InteractiveDesktop>
      <ResponsivePortfolio />

      <div className="macos-window-scroll hidden min-h-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_78%_16%,rgba(37,99,235,0.16),transparent_30%),linear-gradient(135deg,#060a13_0%,#07101d_54%,#050916_100%)] lg:block">
        <div className="portfolio-grid grid lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
          <div className="portfolio-sidebar hidden lg:contents">
            <Sidebar />
          </div>

          <div className="min-w-0 px-4 pb-4 sm:px-6 sm:pb-6 lg:p-7 xl:p-8">
            <HeroSection />
            <SkillsSection />
            <div className="mt-8 grid gap-6 2xl:grid-cols-[minmax(0,1fr)_340px]">
              <ProjectsSection />
              <AboutSection />
            </div>
            <ContactSection />
          </div>
        </div>
      </div>
    </InteractiveDesktop>
  );
}
