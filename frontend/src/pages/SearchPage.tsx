import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  categoryLabels,
  products,
  sources,
  wavelengthBands,
  type Category,
  type WavelengthBandId,
} from '@/data/products'
import SearchBar from '@/components/search/SearchBar'
import { ProductCard, productConfidence } from '@/components/search/ProductCard'

type SortId = 'relevance' | 'price-asc' | 'price-desc'

const sortOptions: { id: SortId; label: string }[] = [
  { id: 'relevance', label: 'Сначала проверенные' },
  { id: 'price-asc', label: 'Цена ↑' },
  { id: 'price-desc', label: 'Цена ↓' },
]

function parsePrice(v: string | null): number | null {
  if (v === null || v.trim() === '') return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

/** Русская плюрализация: 1 результат / 2 результата / 5 результатов */
function pluralize(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
  return forms[2]
}

/** Наивный полнотекстовый поиск по мок-данным (в бэкенде будет/pg full-text) */
function matchesQuery(
  p: (typeof products)[number],
  q: string,
): boolean {
  if (!q) return true
  const haystack = `${p.name} ${p.nameEn} ${p.sku} ${p.brand} ${p.category} ${p.specs.join(' ')}`.toLowerCase()
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token))
}

function overlapsBand(
  w: [number, number],
  band: { min: number; max: number },
): boolean {
  if (w[0] <= 0 && w[1] <= 0) return false
  return w[1] >= band.min && w[0] <= band.max
}

export default function SearchPage() {
  const [params] = useSearchParams()
  const query = params.get('q') ?? ''

  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(new Set())
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set())
  const [selectedBands, setSelectedBands] = useState<Set<WavelengthBandId>>(new Set())
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [onlyVerified, setOnlyVerified] = useState(false)
  const [sort, setSort] = useState<SortId>('relevance')

  const from = parsePrice(priceFrom)
  const to = parsePrice(priceTo)

  const results = useMemo(() => {
    const list = products.filter((p) => {
      if (!matchesQuery(p, query)) return false
      if (selectedCategories.size > 0 && !selectedCategories.has(p.category)) return false
      if (selectedSources.size > 0 && !selectedSources.has(p.sourceName)) return false
      if (selectedBands.size > 0) {
        const ok = [...selectedBands].some((id) => {
          const b = wavelengthBands.find((x) => x.id === id)!
          return overlapsBand(p.wavelength, b)
        })
        if (!ok) return false
      }
      if (from !== null && p.price < from) return false
      if (to !== null && p.price > to) return false
      if (onlyVerified && p.confidence !== 'tested') return false
      return true
    })

    switch (sort) {
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price)
      default:
        return [...list].sort((a, b) => productConfidence(a) - productConfidence(b))
    }
  }, [query, selectedCategories, selectedSources, selectedBands, from, to, onlyVerified, sort])

  const toggle = <T,>(set: Set<T>, value: T, apply: (next: Set<T>) => void) => {
    const next = new Set(set)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    apply(next)
  }

  const activeCategoryNames = [...selectedCategories].map((c) => categoryLabels[c])
  const filterCount = selectedCategories.size + selectedSources.size + selectedBands.size + (onlyVerified ? 1 : 0) + (from !== null || to !== null ? 1 : 0)

  return (
    <div>
      {/* Полоса поиска (sticky под шапкой) */}
      <div className="sticky top-16 z-30 border-b border-night-700 bg-night-950/90 py-3 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SearchBar initialQuery={query} />
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-8 sm:px-6">
        {/* Фильтры */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-40 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Фильтры</h2>
                {filterCount > 0 && (
                  <span className="badge rounded-full bg-accent/15 text-accent">{filterCount}</span>
                )}
              </div>
            </div>

            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-white">Тип компонента</legend>
              <ul className="space-y-1.5">
                {(Object.keys(categoryLabels) as Category[]).map((c) => (
                  <li key={c}>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-400 transition hover:text-slate-200">
                      <input
                        type="checkbox"
                        checked={selectedCategories.has(c)}
                        onChange={() => toggle(selectedCategories, c, setSelectedCategories)}
                        className="h-4 w-4 rounded border-night-600 bg-night-800 text-accent focus:ring-accent/50"
                      />
                      {categoryLabels[c]}
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-white">Источник</legend>
              <ul className="space-y-1.5">
                {sources.map((s) => (
                  <li key={s.name}>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-400 transition hover:text-slate-200">
                      <input
                        type="checkbox"
                        checked={selectedSources.has(s.name)}
                        onChange={() => toggle(selectedSources, s.name, setSelectedSources)}
                        className="h-4 w-4 rounded border-night-600 bg-night-800 text-accent focus:ring-accent/50"
                      />
                      <span className="font-mono text-xs">{s.url}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-white">Диапазон λ</legend>
              <ul className="space-y-1.5">
                {wavelengthBands.map((b) => (
                  <li key={b.id}>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-400 transition hover:text-slate-200">
                      <input
                        type="checkbox"
                        checked={selectedBands.has(b.id)}
                        onChange={() => toggle(selectedBands, b.id, setSelectedBands)}
                        className="h-4 w-4 rounded border-night-600 bg-night-800 text-accent focus:ring-accent/50"
                      />
                      {b.label}
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-white">Цена, ₽</legend>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  placeholder="от"
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                  className="input !px-2.5 !py-1.5 font-mono !text-xs"
                />
                <span className="text-slate-600">—</span>
                <input
                  type="number"
                  min="0"
                  placeholder="до"
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                  className="input !px-2.5 !py-1.5 font-mono !text-xs"
                />
              </div>
            </fieldset>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-400 transition hover:text-slate-200">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="h-4 w-4 rounded border-night-600 bg-night-800 text-accent focus:ring-accent/50"
              />
              Только проверенные аналоги
            </label>

            <p className="rounded-lg border border-night-700 bg-night-900 p-3 text-[11px] leading-relaxed text-slate-500">
              Демо-данные. В рабочей версии поиск выполняется на сервере по живым источникам.
            </p>
          </div>
        </aside>

        {/* Результаты */}
        <section className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-lg font-bold text-white">
              {query ? (
                <>
                  По запросу <span className="font-mono text-accent">«{query}»</span> — {results.length}{' '}
                  {pluralize(results.length, ['результат', 'результата', 'результатов'])}
                </>
              ) : (
                'Все компоненты каталога'
              )}
            </h1>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="input !w-auto !px-3 !py-2 !text-xs"
            >
              {sortOptions.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {activeCategoryNames.length > 0 && (
            <p className="mt-2 text-xs text-slate-500">Тип: {activeCategoryNames.join(', ')}</p>
          )}

          {results.length === 0 ? (
            <div className="card mt-6 border-dashed border-night-600 bg-night-900/60 py-12 text-center">
              <h2 className="text-xl font-bold text-white">Ничего не нашлось</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
                В публичных источниках по этому запросу пусто. Это как раз случай для нашей основной
                услуги: инженер найдёт проверенный аналог или предложит поставку вручную.
              </p>
              <Link to="/register" className="btn-primary mt-6">
                Оставить запрос инженеру
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}

          {/* Мостик к инженеру (гибрид: поиск + ручная проверка) */}
          {results.length > 0 && (
            <div className="card mt-8 flex flex-col items-start justify-between gap-4 border-night-600 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-base font-bold text-white">
                  Не уверены в совместимости замены?
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Инженер проверит критические параметры — покрытия, допуски, качество поверхности —
                  и подготовит документированное сравнение.
                </p>
              </div>
              <Link to="/register" className="btn-primary shrink-0">
                Проверить у инженера
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
