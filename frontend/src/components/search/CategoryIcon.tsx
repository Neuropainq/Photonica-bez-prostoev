// Тонкие контурные иконки категорий каталога — единый стиль stroke 1.8.
// Размер задаётся классом снаружи.

import type { Category } from '@/data/products'

interface IconProps {
  className?: string
}

const base = {
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function CategoryIcon({ category, className }: { category: Category } & IconProps) {
  switch (category) {
    case 'lenses':
      return (
        <svg className={className} {...base}>
          <path d="M6 3c-1.7 3.4-2.6 6.6-2.6 9S4.3 17.6 6 21" />
          <path d="M6 3c1.7 3.4 2.6 6.6 2.6 9S7.7 17.6 6 21" />
          <path d="M18 3c1.7 3.4 2.6 6.6 2.6 9S19.7 17.6 18 21" />
          <path d="M18 3c-1.7 3.4-2.6 6.6-2.6 9s.9 5.6 2.6 9" />
        </svg>
      )
    case 'mirrors':
      return (
        <svg className={className} {...base}>
          <path d="M4 6l16 4v4L4 18V6z" />
          <path d="M20 6v12" />
        </svg>
      )
    case 'filters':
      return (
        <svg className={className} {...base}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4a32 32 0 0 1 0 16" />
          <path d="M12 4a32 32 0 0 0 0 16" opacity=".4" />
        </svg>
      )
    case 'beamsplitters':
      return (
        <svg className={className} {...base}>
          <path d="M5 19L19 5" />
          <path d="M4 8h6" />
          <path d="M14 16h6" />
        </svg>
      )
    case 'prisms':
      return (
        <svg className={className} {...base}>
          <path d="M12 4l8 15H4l8-15z" />
          <path d="M7 19l7-7" opacity=".5" />
        </svg>
      )
    case 'cameras':
      return (
        <svg className={className} {...base}>
          <rect x="3" y="7" width="18" height="13" rx="2.5" />
          <path d="M8 7l1.5-2.5h5L16 7" />
          <circle cx="12" cy="13.5" r="3.5" />
        </svg>
      )
    case 'lasers':
      return (
        <svg className={className} {...base}>
          <path d="M3 12h11" />
          <path d="M14 8v8" />
          <path d="M17 9.5v5" />
          <path d="M20 11v2" />
        </svg>
      )
    case 'optomechanics':
      return (
        <svg className={className} {...base}>
          <path d="M9 3h6v4h4v14H5V7h4V3z" />
          <path d="M9 11h6M9 15h6" opacity=".5" />
        </svg>
      )
  }
}
