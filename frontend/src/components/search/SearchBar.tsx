import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { FormEvent } from 'react'

const quickQueries = [
  'Ахроматическая линза Ø25.4',
  'ACH254-100',
  'Зеркало 1064 нм',
  'Bandpass 550 нм',
  'Камера USB3',
  'Призма BK7',
]

interface SearchBarProps {
  size?: 'lg' | 'md'
  autoFocus?: boolean
  initialQuery?: string
}

export default function SearchBar({ size = 'md', autoFocus = false, initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const submit = (value: string) => {
    navigate(`/search?q=${encodeURIComponent(value.trim())}`)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    submit(query)
  }

  const isLarge = size === 'lg'

  return (
    <div className="w-full">
      <form
        onSubmit={onSubmit}
        className={`flex items-center gap-2 rounded-xl border border-night-600 bg-night-800/90 shadow-glow backdrop-blur transition focus-within:border-accent/60 ${
          isLarge ? 'p-2 pl-4 sm:p-2.5 sm:pl-5' : 'p-1.5 pl-3'
        }`}
      >
        <svg
          className={`shrink-0 text-slate-500 ${isLarge ? 'h-5 w-5' : 'h-4 w-4'}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Найдите оптику: артикул, тип или параметры — например «ахромат f=100»"
          className={`w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none ${
            isLarge ? 'py-2.5 text-base sm:text-lg' : 'py-2 text-sm'
          }`}
        />
        <button type="submit" className={`btn-primary shrink-0 ${isLarge ? '!px-6 !py-3' : '!px-4 !py-2'}`}>
          Искать
        </button>
      </form>

      {isLarge && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500">Популярные запросы:</span>
          {quickQueries.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => submit(q)}
              className="chip font-mono"
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
