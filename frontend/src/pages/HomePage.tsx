import { Link } from 'react-router-dom'
import SearchBar from '@/components/search/SearchBar'
import { sources } from '@/data/products'

const steps = [
  {
    title: 'Найдите',
    text: 'Один запрос по всем проверенным источникам: каталоги производителей, дистрибьюторов и наша база аналогов.',
  },
  {
    title: 'Сравните',
    text: 'Совпадающие и отличающиеся параметры рядом: покрытия, допуски, диапазон λ, наличие и цена в разных магазинах.',
  },
  {
    title: 'Закажите — или доверьте инженеру',
    text: 'Простые позиции покупаете напрямую. Сложные — проверяются инженером: сравнение характеристик и подтверждённое КП.',
  },
]

const stats = [
  { value: '6+ источников', label: 'каталоги и магазины' },
  { value: '40 000+ позиций', label: 'индексируем на демо-этапе' },
  { value: '1 раб. день', label: 'ответ инженера по запросу' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Спектральный луч */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px spectrum-line opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(34,211,238,0.13),transparent_70%)]" />
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="badge mx-auto rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-accent">
              Поиск + инженерная проверка · для лабораторий и R&D
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-6xl">
              Умный поиск <span className="text-spectrum">научной оптики</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
              Один запрос — и вы видите компоненты из всех проверенных источников с ценами,
              наличием и характеристиками. Сложные замены проверяет инженер.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <SearchBar size="lg" />
          </div>

          <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 border-t border-night-700 pt-8 text-center sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.value}>
                <dt className="font-mono text-sm text-accent">{s.value}</dt>
                <dd className="mt-1 text-xs text-slate-500">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Источники */}
      <section className="border-y border-night-700 bg-night-900/50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500">
            Индексируем проверенные источники
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {sources.map((s) => (
              <span key={s.name} className="font-mono text-sm text-slate-400">
                {s.url}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="section-title text-center">Три шага — от запроса до поставки</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
          Поиск закрывает рутину. Инженерная служба — случаи, где нельзя ошибиться.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="card relative">
              <span className="absolute -top-3 left-6 font-mono text-sm text-accent">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/how-it-works" className="btn-secondary">
            Подробно про инженерную проверку
          </Link>
        </div>
      </section>

      {/* Достоверность + мостик к сервису */}
      <section className="border-y border-night-700 bg-night-900/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Не поисковик, а проверка</p>
              <h2 className="section-title mt-3">
                Каждая замена проходит по документам, а не по описанию товара
              </h2>
              <p className="mt-4 text-slate-400">
                В результатах поиска вы видите уровень достоверности аналога. Когда базовой
                уверенности мало — подключается инженер: сопоставление критических параметров,
                ссылки на datasheets и, при необходимости, испытание в системе.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/search?q=ахромат" className="btn-primary">
                  Попробовать поиск
                </Link>
                <Link to="/register" className="btn-secondary">
                  Оставить запрос инженеру
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  label: 'Проверен в системе',
                  text: 'Есть протокол испытаний в оговорённых условиях конкретной оптической системы.',
                },
                {
                  label: 'Сопоставим по документации',
                  text: 'Критические параметры подтверждены datasheets, практическая замена не испытана.',
                },
                {
                  label: 'Кандидат на замену',
                  text: 'Часть параметров совпадает, есть неизвестные — требуется подтверждение инженером.',
                },
              ].map((level, i) => (
                <div
                  key={level.label}
                  className={`card !p-5 ${i === 0 ? 'border-accent/40' : ''}`}
                >
                  <p className={`text-sm font-semibold ${i === 0 ? 'text-accent' : 'text-white'}`}>
                    {level.label}
                  </p>
                  <p className="mt-1.5 text-sm text-slate-400">{level.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Финальный CTA */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px spectrum-line opacity-70" />
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <h2 className="section-title">Соберите оптику — не простаивайте</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Найдите компонент за минуты. Не нашли — инженер найдёт за день.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/search" className="btn-primary">
              Открыть поиск
            </Link>
            <Link to="/pricing" className="btn-secondary">
              Посмотреть подписку
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
