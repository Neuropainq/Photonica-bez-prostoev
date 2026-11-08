import { Link } from 'react-router-dom'

export default function RegisterPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-20">
      <h1 className="section-title text-center">Регистрация</h1>
      <form className="card mt-8 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Организация / лаборатория" className="input" />
        <input type="text" placeholder="Контактное лицо" className="input" />
        <input type="email" placeholder="Email" className="input" />
        <input type="password" placeholder="Пароль" className="input" />
        <button type="submit" className="btn-primary">Создать аккаунт</button>
        <p className="text-center text-xs text-slate-500">Форма будет подключена к API на этапе 2</p>
      </form>
      <p className="mt-6 text-center text-sm text-slate-400">
        Уже есть аккаунт?{' '}
        <Link to="/login" className="text-accent hover:underline">Войти</Link>
      </p>
    </div>
  )
}