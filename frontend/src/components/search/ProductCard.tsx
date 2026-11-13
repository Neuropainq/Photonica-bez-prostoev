import type { Product } from '@/data/products'
import { availabilityLabels, confidenceLabels } from '@/data/products'
import { CategoryIcon } from './CategoryIcon'

/** Спектральная полоса: позиция длины волны на шкале 200–1200 нм */
function band(w: [number, number]): { left: string; width: string } | null {
  const MIN = 200
  const MAX = 1200
  const clamp = (v: number) => Math.min(100, Math.max(0, ((v - MIN) / (MAX - MIN)) * 100))
  const [min, max] = w
  if (min <= 0 && max <= 0) return null // например, оптомеханика
  const l = clamp(min)
  const r = clamp(max)
  if (r <= 0) return null
  return { left: `${l}%`, width: `${Math.max(4, r - l)}%` }
}

const availabilityStyles: Record<Product['availability'], string> = {
  stock: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  'under-order': 'bg-amber-500/10 text-amber-300 border border-amber-500/30',
}

const confidenceStyles: Record<NonNullable<Product['confidence']>, string> = {
  tested: 'bg-accent/15 text-accent-soft border border-accent/40',
  documented: 'bg-slate-500/10 text-slate-300 border border-slate-500/30',
  candidate: 'bg-slate-500/10 text-slate-400 border border-slate-500/30',
}

const confidenceRank: Record<NonNullable<Product['confidence']>, number> = {
  tested: 0,
  documented: 1,
  candidate: 2,
}

interface ProductCardProps {
  product: Product
  /** Подсвечивать карточки проверенных аналогов */
  highlightVerified?: boolean
}

export function ProductCard({ product, highlightVerified = true }: ProductCardProps) {
  const b = band(product.wavelength)
  return (
    <article
      className={`card card-hover flex flex-col !p-5 ${
        highlightVerified && product.confidence === 'tested' ? 'border-accent/40' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <CategoryIcon category={product.category} className="h-5 w-5" />
        </span>
        <span className={`badge rounded-full ${availabilityStyles[product.availability]}`}>
          {availabilityLabels[product.availability]}
        </span>
      </div>

      <h3 className="mt-3 text-sm font-semibold leading-snug text-white">{product.name}</h3>
      <p className="mt-0.5 font-mono text-xs text-slate-500">
        {product.sku} · {product.brand}
      </p>

      {product.confidence && (
        <p className="mt-2">
          <span className={`badge rounded-full ${confidenceStyles[product.confidence]}`}>
            {confidenceLabels[product.confidence]}
          </span>
        </p>
      )}

      <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400">{product.description}</p>

      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-slate-500">
        {product.specs.slice(0, 3).map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      {b && (
        <div className="mt-3">
          <div className="spectrum-line relative h-1.5 rounded-full bg-night-700">
            <span
              className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 rounded bg-white shadow-glow"
              style={{ left: b.left }}
            />
            <span
              className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 rounded bg-white shadow-glow"
              style={{ left: `calc(${b.left} + ${b.width})` }}
            />
          </div>
          <p className="mt-1 font-mono text-[10px] text-slate-600">
            λ {product.wavelength[0] === product.wavelength[1]
              ? `${product.wavelength[0]} нм`
              : `${product.wavelength[0]}–${product.wavelength[1]} нм`}
          </p>
        </div>
      )}

      <div className="mt-4 flex items-end justify-between border-t border-night-700 pt-4">
        <div>
          <p className="text-base font-bold text-white">
            {product.price.toLocaleString('ru-RU')} ₽
          </p>
          <p className="text-[11px] text-slate-500">источник: {product.sourceUrl}</p>
        </div>
        <button type="button" className="btn-secondary !px-4 !py-2 !text-xs">
          Сравнить
        </button>
      </div>
    </article>
  )
}

export function productConfidence(p: Product): number {
  return p.confidence ? confidenceRank[p.confidence] : 3
}
