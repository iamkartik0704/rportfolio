import { Award, BookMarked } from 'lucide-react'
import SectionHeading from './SectionHeading'
import RoughBox from './RoughBox'

// A compact two-up row: courses taught + honors/recognition.
export default function TeachingAndHonors({ teaching = [], honors = [] }) {
  if (!teaching.length && !honors.length) return null

  return (
    <section aria-labelledby="more-title" className="scroll-mt-8">
      <SectionHeading id="more-title" label="// appendix" title="Teaching & Honors" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {teaching.length ? (
          <RoughBox filter="sm" tilt="l" color="#0f766e" className="p-5">
            <h3 className="font-pen flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100">
              <BookMarked className="h-5 w-5 text-teal-600" aria-hidden="true" />
              Courses Taught
            </h3>
            <ul className="mt-3 space-y-2">
              {teaching.map((course) => (
                <li
                  key={course}
                  className="font-pen flex items-center gap-2 text-[15px] text-slate-600 dark:text-slate-300"
                >
                  <span className="h-2 w-2 rotate-45 bg-teal-400" aria-hidden="true" />
                  {course}
                </li>
              ))}
            </ul>
          </RoughBox>
        ) : null}

        {honors.length ? (
          <RoughBox filter="sm" tilt="r" color="#b45309" className="p-5">
            <h3 className="font-pen flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100">
              <Award className="h-5 w-5 text-amber-600" aria-hidden="true" />
              Honors & Recognition
            </h3>
            <ul className="mt-3 space-y-3">
              {honors.map((h) => (
                <li key={h.id} className="font-pen text-[15px]">
                  <p className="font-bold text-slate-700 dark:text-slate-200">{h.title}</p>
                  <p className="text-slate-500 dark:text-slate-400">{h.detail}</p>
                </li>
              ))}
            </ul>
          </RoughBox>
        ) : null}
      </div>
    </section>
  )
}
