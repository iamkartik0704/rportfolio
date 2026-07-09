import { Briefcase } from 'lucide-react'
import SectionHeading from './SectionHeading'
import RoughBox from './RoughBox'

// Vertical flowchart: each role is a node, wired to the next by a wavy
// hand-drawn arrow — like boxes connected on an Excalidraw canvas.
export default function ExperienceTimeline({ experience = [] }) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-8">
      <SectionHeading
        id="experience-title"
        label="// trajectory"
        title="Experience"
        hint="git log --oneline"
      />

      <ol className="relative ml-1">
        {experience.map((node, i) => {
          const isCurrent = i === 0
          return (
            <li key={node.id} className="relative pl-14 pb-2">
              {/* Wavy connector arrow spanning the dynamic height between nodes.
                Anchored to THIS node, dynamically stretching down to the NEXT node.
                We use flex to prevent the arrowhead from stretching vertically.
              */}
              {i < experience.length - 1 && (
                <div
                  className="absolute left-[14px] top-[44px] bottom-[4px] flex w-5 flex-col text-slate-400 dark:text-slate-600"
                  aria-hidden="true"
                >
                  {/* Arrowhead pointing UP to the newer role */}
                  <svg
                    className="h-3 w-full shrink-0"
                    viewBox="0 0 20 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12 L7 2 L12 12" />
                  </svg>
                  
                  {/* Stretching wavy line down to the older role */}
                  <svg
                    className="w-full flex-1"
                    viewBox="0 0 20 100"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M7 0 C 3 33, 11 66, 7 100"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{ filter: 'url(#rough-line)' }}
                    />
                  </svg>
                </div>
              )}

              {/* Node marker (a small drawn circle) */}
              <span
                className="absolute left-0 top-1 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white"
                style={{
                  filter: 'url(#rough-sm)',
                  border: `2px solid ${isCurrent ? '#2563eb' : '#64748b'}`,
                }}
                aria-hidden="true"
              >
                <Briefcase
                  className={`h-4 w-4 ${isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
                />
              </span>

              <RoughBox
                filter="sm"
                tilt={i % 2 === 0 ? 'r' : 'l'}
                color={isCurrent ? '#2563eb' : '#475569'}
                className="mb-12 p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                  <h3 className="font-pen text-lg font-bold text-slate-900 dark:text-slate-100">{node.role}</h3>
                  <span
                    className={`shrink-0 font-marker text-base font-bold ${
                      isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {node.duration}
                  </span>
                </div>
                <p className="font-pen mt-0.5 text-[15px] text-slate-500 dark:text-slate-400">{node.institution}</p>
              </RoughBox>
            </li>
          )
        })}
      </ol>
    </section>
  )
}