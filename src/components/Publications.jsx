import { useState } from 'react'
import { FileText, Users, BookOpen, ScrollText, Presentation, Library, BadgeCheck, Plus, Minus } from 'lucide-react'
import SectionHeading from './SectionHeading'
import RoughBox from './RoughBox'

// Marker-colored venue badges.
const TYPE_INK = {
  Journal: { ink: '#1e40af', bg: '#dbeafe' },
  Conference: { ink: '#0f766e', bg: '#ccfbf1' },
  Book: { ink: '#5b21b6', bg: '#ede9fe' },
  Patent: { ink: '#b45309', bg: '#fef3c7' },
}

// Ordered groups — each gets its own labelled block. The plural label and a
// small marker icon make the four kinds of work easy to tell apart at a glance.
const GROUPS = [
  { type: 'Journal', label: 'Journals', icon: ScrollText },
  { type: 'Conference', label: 'Conferences', icon: Presentation },
  { type: 'Book', label: 'Books', icon: Library },
  { type: 'Patent', label: 'Patents', icon: BadgeCheck },
]

// How many cards to show per group before the "Load more" button appears.
const PREVIEW_COUNT = 3

function PublicationCard({ pub, i }) {
  const t = TYPE_INK[pub.type] ?? { ink: '#334155', bg: '#f1f5f9' }
  return (
    <RoughBox
      as="article"
      filter="sm"
      tilt={i % 2 === 0 ? 'l' : 'r'}
      color="#334155"
      className="p-5"
    >
      <div className="flex items-start gap-4">
        {/* "Draft" sheet icon */}
        <span
          className="mt-0.5 hidden h-11 w-11 shrink-0 items-center justify-center bg-amber-50 text-amber-600 sm:flex"
          style={{ filter: 'url(#rough-sm)', border: '1.6px solid #d97706' }}
          aria-hidden="true"
        >
          <FileText className="h-5 w-5" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-pen text-[17px] font-bold leading-snug text-slate-900 dark:text-slate-100">
              {pub.title}
            </h4>
            {pub.type ? (
              <span
                className="hidden shrink-0 px-2.5 py-0.5 font-marker text-sm font-bold sm:inline-block"
                style={{
                  filter: 'url(#rough-md)',
                  backgroundColor: t.bg,
                  color: t.ink,
                }}
              >
                {pub.type}
              </span>
            ) : null}
          </div>

          <p className="font-pen mt-2 flex items-center gap-1.5 text-[15px] text-slate-500 dark:text-slate-400">
            <Users className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
            <span className="truncate">{pub.authors}</span>
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-pen flex items-center gap-1.5 text-[15px] font-semibold text-slate-700 dark:text-slate-300">
              <BookOpen className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
              {pub.journal}
            </span>
            <span className="font-marker text-lg font-bold text-blue-600">
              {pub.year}
            </span>
          </div>
        </div>
      </div>
    </RoughBox>
  )
}

// A "sticky-note" toggle drawn in the same hand-inked language as the cards.
function LoadMoreButton({ expanded, hiddenCount, accent, onClick, controls }) {
  const Icon = expanded ? Minus : Plus
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      aria-controls={controls}
      className="group/lm font-marker inline-flex items-center gap-2 px-4 py-1.5 text-[15px] font-bold tracking-tight text-slate-700 dark:text-slate-300 transition-transform duration-150 hover:-translate-y-0.5 hover:text-slate-900 dark:hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{ filter: 'url(#rough-sm)', backgroundColor: accent.bg, color: accent.ink }}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {expanded ? 'Show less' : `Load ${hiddenCount} more`}
    </button>
  )
}

function PublicationGroup({ group }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = group.icon
  const t = TYPE_INK[group.type]
  const { items } = group

  const collapsible = items.length > PREVIEW_COUNT
  const visible = expanded ? items : items.slice(0, PREVIEW_COUNT)
  const hiddenCount = items.length - PREVIEW_COUNT
  const listId = `pub-group-${group.type.toLowerCase()}`

  return (
    <div>
      {/* Group label — marker-style sub-heading per category */}
      <div className="mb-4 flex items-center gap-2.5">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center"
          style={{ filter: 'url(#rough-sm)', backgroundColor: t.bg, color: t.ink }}
          aria-hidden="true"
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <h3 className="font-marker text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200">
          {group.label}
        </h3>
        <span className="font-pen text-sm text-slate-400 dark:text-slate-500">{items.length}</span>
      </div>

      <ul id={listId} className="space-y-5">
        {visible.map((pub, i) => (
          <li key={pub.id}>
            <PublicationCard pub={pub} i={i} />
          </li>
        ))}
      </ul>

      {collapsible ? (
        <div className="mt-4 flex justify-center">
          <LoadMoreButton
            expanded={expanded}
            hiddenCount={hiddenCount}
            accent={t}
            controls={listId}
            onClick={() => setExpanded((v) => !v)}
          />
        </div>
      ) : null}
    </div>
  )
}

export default function Publications({ publications = [] }) {
  // Bucket each entry by type, preserving the order they appear in the data.
  const buckets = GROUPS.map((g) => ({
    ...g,
    items: publications.filter((p) => p.type === g.type),
  })).filter((g) => g.items.length > 0)

  return (
    <section id="publications" aria-labelledby="publications-title" className="scroll-mt-8">
      <SectionHeading
        id="publications-title"
        label="// selected work"
        title="Publications"
        hint={`${publications.length} drafts`}
      />

      <div className="space-y-10">
        {buckets.map((group) => (
          <PublicationGroup key={group.type} group={group} />
        ))}
      </div>
    </section>
  )
}
