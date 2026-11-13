import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Базовый',
    price: '0 ₽',
    period: 'навсегда',
    features: [
      'Поиск по всем источникам',
      'До 10 сравнений в месяц',
      'Сохранение 5 подборок',
      'Ответ инженера — до 2 рабочих дней',
    ],
    cta: 'Начать бесплатно',
    to: '/register',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '1 990 ₽',
    period: 'в месяц · или 19 900 ₽ в год',
    features: [
      'Неограниченный поиск и сравнения',
      'Безлимитные подборки',
      'Оповещения о поступлении и смене цены',
      'Приоритетный ответ инженера — до 1 дня',
      'Экспорт сравнений в PDF',
    ],
    cta: 'Выбрать Pro',
    to: '/register',
    highlighted: true,
  },
  {
    name: 'Лаборатория',
    price: '9 900 ₽',
    period: 'в месяц · до 10 сотрудников',
    features: [
      'Всё из Pro для всей команды',
      'Общий перечень компонентов для снабжения',
      'Регулярные поставки по графику',
      'Персональный инженер и интеграция с закупками',
    ],
    cta: 'Обсудить для лаборатории',
    to: '/register',
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px spectrum-line opacity-70" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Подписка</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">Цены, которые окупаются простоем</h1>
          <p className="mt-4 text-slate-400">
            Подписка открывает поиск и инструменты сравнения. Инженерная обработка запросов
            доступна на любом тарифе — по понятным правилам каждого плана.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card relative flex flex-col ${
                plan.highlighted ? 'border-accent/50 shadow-glow lg:-translate-y-3' : ''
              }`}
            >
              {plan.highlighted && (
                <p className="badge absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-night-950">
                  Выбор лабораторий
                </p>
              )}
              <h2 className="text-lg font-semibold text-white">{plan.name}</h2>
              <p className="mt-4 text-4xl font-bold text-white">{plan.price}</p>
              <p className="mt-1 text-xs text-slate-500">{plan.period}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to={plan.to} className={`mt-8 ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-slate-500">
          Тарифы указаны для демо-версии проекта и не являются публичной офертой. Оплата подписки
          недоступна на этапе курсовой работы — доступ выдаёт администрация сервиса.
        </p>
      </div>
    </div>
  )
}
