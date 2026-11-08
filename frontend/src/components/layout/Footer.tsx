import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-night-700 bg-night-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Фотоника без простоев · Подбор и поставка научной оптики
        </p>
        <nav className="flex gap-6 text-sm text-slate-500">
          <Link to="/how-it-works" className="transition hover:text-accent">Как мы работаем</Link>
          <Link to="/dashboard" className="transition hover:text-accent">Личный кабинет</Link>
        </nav>
      </div>
    </footer>
  )
}