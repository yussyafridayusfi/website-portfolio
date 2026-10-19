import Navbar from './components/Navbar.jsx'
import HeroSection from './components/HeroSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import ProjectSection from './components/ProjectSection.jsx'
import SkillsSection from './components/SkillsSection.jsx'
import GitHubExplorer from './components/GitHubExplorer.jsx'
import ContactSection from './components/ContactSection.jsx'
import CvDocument from './components/CvDocument.jsx'
import { profile } from './config/portfolio.js'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>

      <div className="site-shell">
        <Navbar />

        <main id="main">
          <HeroSection />
          <AboutSection />
          <ProjectSection />
          <SkillsSection />
          <GitHubExplorer />
          <ContactSection />
        </main>

        <footer className="border-t border-rule no-print">
          <div className="shell flex flex-col gap-3 py-10 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {profile.name}
            </p>
            <p>
              Built with React and Vite. Repository data comes from the public GitHub API.{' '}
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline"
              >
                Source on GitHub
              </a>
            </p>
          </div>
        </footer>
      </div>

      <CvDocument />
    </>
  )
}
