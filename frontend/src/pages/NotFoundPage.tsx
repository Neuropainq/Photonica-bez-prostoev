import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="font-mono text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-xl font-semibold text-white">Страница не найдена</h1>
      <Link to="/" className="btn-secondary mt-8">На главную</Link>
    </div>
  )
}