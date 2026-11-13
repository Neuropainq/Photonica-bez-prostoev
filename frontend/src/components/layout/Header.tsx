import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/search', label: 'Поиск' },
  { to: '/how-it-works', label: 'Как мы работаем' },
  { to: '/pricing', label: 'Подписка' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-night-700 bg-night-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent shadow-glow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="4" />
              <path d="M2 12h6M16 12h6M12 2v6M12 16v6" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-sm font-bold tracking-wide text-white sm:text-base">
            Фотоника <span className="text-accent">без простоев</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition ${isActive ? 'text-accent' : 'text-slate-400 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-slate-400 transition hover:text-white">
            Вход
          </Link>
          <Link to="/register" className="btn-primary !px-4 !py-2">
            Оставить запрос
          </Link>
        </div>
      </div>
    </header>
  )
}
