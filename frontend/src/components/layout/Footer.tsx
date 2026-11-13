import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-night-700 bg-night-900">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-sm font-bold text-white">
            Фотоника <span className="text-accent">без простоев</span>
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            Поиск и поставка научной оптики для лабораторий, НИИ и R&D-подразделений.
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm text-slate-500">
          <Link to="/search" className="transition hover:text-accent">Поиск компонентов</Link>
          <Link to="/how-it-works" className="transition hover:text-accent">Как мы работаем</Link>
          <Link to="/pricing" className="transition hover:text-accent">Подписка</Link>
          <Link to="/dashboard" className="transition hover:text-accent">Личный кабинет</Link>
        </nav>
        <div>
          <p className="text-xs leading-relaxed text-slate-500">
            Данные поиска — демонстрационные и собраны для курсового проекта. Товарные знаки
            принадлежат их правообладателям и приведены как источники каталогов.
          </p>
          <p className="mt-3 text-xs text-slate-600">
            © {new Date().getFullYear()} Фотоника без простоев
          </p>
        </div>
      </div>
    </footer>
  )
}
