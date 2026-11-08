const steps = [
  { title: 'Запрос', text: 'Вы оставляете артикул, характеристики и количество. Можно приложить спецификацию или чертёж.' },
  { title: 'Уточнение требований', text: 'Инженер уточняет критические параметры: покрытия, допуски, качество поверхности, диапазон длин волн.' },
  { title: 'Поиск и проверка', text: 'Подбираем варианты из базы и запросов поставщикам, сверяем техническую документацию.' },
  { title: 'Сравнение', text: 'Вы получаете таблицу совпадающих и отличающихся характеристик со ссылками на первичные документы.' },
  { title: 'Предложение', text: 'Подтверждённая цена, срок действия предложения, статус наличия и ожидаемый срок поставки.' },
  { title: 'Поставка', text: 'Закупка через проверенный канал, доставка, необходимые документы и контроль исполнения.' },
]

const confidenceLevels = [
  { label: 'Сопоставим по документации', text: 'Основные характеристики подтверждены документами, практическая замена не испытана.' },
  { label: 'Кандидат на замену', text: 'Часть параметров совпадает, есть существенные неизвестные — требуется подтверждение.' },
  { label: 'Проверен в системе', text: 'Есть протокол испытания в оговорённых условиях конкретной системы.' },
]

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="section-title">Как мы работаем</h1>
      <p className="mt-4 max-w-2xl text-slate-400">
        Каждый запрос проходит инженерную проверку. Мы не предлагаем автоматические замены
        без подтверждения пригодности.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.title} className="card">
            <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, '0')}</span>
            <h2 className="mt-2 font-semibold text-white">{step.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.text}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-xl font-bold text-white">Уровни достоверности аналогов</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {confidenceLevels.map((level) => (
          <div key={level.label} className="card border-accent/20">
            <h3 className="text-sm font-semibold text-accent">{level.label}</h3>
            <p className="mt-2 text-sm text-slate-400">{level.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}