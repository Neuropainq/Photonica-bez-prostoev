import { Link } from 'react-router-dom'

const products = [
  {
    title: 'Поставка компонентов',
    text: 'Подбор из доступного ассортимента, коммерческое предложение, закупка через проверенный канал, доставка и документы.',
  },
  {
    title: 'Инженерный подбор аналога',
    text: 'Анализ спецификации, сравнение параметров, проверка документации и заключение с совпадениями, отличиями и неизвестными.',
  },
  {
    title: 'Регулярное снабжение',
    text: 'Согласованный перечень компонентов, периодические заказы, единая спецификация и история закупок вашей лаборатории.',
  },
]

const problems = [
  'Редкий или недоступный артикул',
  'Неуверенность в совместимости замены',
  'Неподтверждённые сроки поставки',
  'Трудоёмкая комплектация закупки',
]

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/5 px-4 py-1 text-xs font-medium tracking-wide text-accent">
            B2B-сервис для лабораторий и R&D
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Проверенные аналоги и поставка{' '}
            <span className="text-accent">научной оптики</span> — без простоев
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-400">
            Превращаем сложный запрос на оптический компонент в документированное решение:
            подходящие варианты, сравнение характеристик, проверенный канал поставки,
            цена и обоснованный срок.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/register" className="btn-primary">Оставить запрос</Link>
            <Link to="/how-it-works" className="btn-secondary">Как мы работаем</Link>
          </div>
        </div>
      </section>

      <section className="border-t border-night-700 bg-night-900/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="section-title">Какие проблемы решаем</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((p) => (
              <div key={p} className="card flex items-start gap-3 !p-5">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <p className="text-sm text-slate-300">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="section-title">Три продукта — одна цель</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {products.map((product, i) => (
            <div key={product.title} className="card flex flex-col">
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{product.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{product.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/register" className="btn-primary">Начать с запроса</Link>
        </div>
      </section>
    </>
  )
}