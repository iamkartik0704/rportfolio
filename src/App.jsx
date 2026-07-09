import profile from './data/profileData.json'
import RoughFilters from './components/RoughFilters'
import IdentityPanel from './components/IdentityPanel'
import Biography from './components/Biography'
import ResearchInterests from './components/ResearchInterests'
import ExperienceTimeline from './components/ExperienceTimeline'
import Publications from './components/Publications'
import TeachingAndHonors from './components/TeachingAndHonors'
import ThemeSwitcher from './components/ThemeSwitcher'

// The whole UI is driven by profileData.json — nothing below is hardcoded
// content. Swap the JSON and the page re-renders for any faculty member.
export default function App() {
  const {
    identity,
    metrics,
    biography,
    researchInterests,
    experience,
    publications,
    teaching,
    honors,
  } = profile

  return (
    <div className="min-h-screen">
      <ThemeSwitcher />
      {/* Hand-drawn SVG ink filters, injected once */}
      <RoughFilters />

      {/* Skip link for keyboard / screen-reader users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-700 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        {/* LEFT — Identity Anchor (sticky on desktop) */}
        <IdentityPanel identity={identity} metrics={metrics} />

        {/* RIGHT — Data Canvas */}
        <main
          id="main"
          className="w-full px-5 py-10 sm:px-8 lg:w-[65%] lg:border-l lg:border-slate-200 lg:px-12 lg:py-16"
        >
          <div className="space-y-12">
            <Biography text={biography} />
            <ResearchInterests interests={researchInterests} />
            <ExperienceTimeline experience={experience} />
            <Publications publications={publications} />
            <TeachingAndHonors teaching={teaching} honors={honors} />
          </div>

          {/* Footer / colophon */}
          <footer className="mt-16 border-t-2 border-dashed border-slate-300 pt-6">
            <p className="font-pen text-sm text-slate-400">
              {identity.institution} · {identity.department}
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}
