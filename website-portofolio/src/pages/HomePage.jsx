import AboutSection from '../components/AboutSection.jsx'
import ContactSection from '../components/ContactSection.jsx'
import GitHubExplorer from '../components/GitHubExplorer.jsx'
import HeroSection from '../components/HeroSection.jsx'
import ProjectSection from '../components/ProjectSection.jsx'
import SkillsSection from '../components/SkillsSection.jsx'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <SkillsSection />
      <GitHubExplorer />
      <ContactSection />
    </>
  )
}
