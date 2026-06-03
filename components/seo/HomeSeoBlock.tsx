import { Link } from '@/i18n/navigation';

export function HomeSeoBlock() {
  return (
    <section
      id="onlyfans-agentstvo"
      className="relative py-16 md:py-22 border-t border-white/[0.06] bg-[#0a0a10]"
      aria-labelledby="seo-block-title"
    >
      <div className="section-grid absolute inset-0 opacity-40 pointer-events-none" aria-hidden />
      <div className="max-w-3xl mx-auto px-5 md:px-8 relative z-10">
        <p className="eyebrow-bright mb-4">OnlyFans агентство</p>
        <h2 id="seo-block-title" className="heading-section text-[clamp(1.75rem,4vw,2.5rem)] mb-6">
          Премиальное агентство для моделей, которые ищут рост и поддержку
        </h2>
        <div className="space-y-4 text-body">
          <p>
            <strong className="text-white/90 font-medium">OFM&apos;s Model Agency</strong> — это
            OnlyFans агентство для моделей, которым нужен профессиональный менеджмент: маркетинг,
            ведение чатов, контент-стратегия и аналитика. Мы помогаем увеличивать доход на
            подписочных creator-платформах и берём на себя операционную рутину.
          </p>
          <p>
            Если вы ищете, как выбрать OnlyFans агентство, начните с прозрачных условий и реальных
            кейсов. В нашем{' '}
            <Link href="/faq" className="text-accent-pink hover:text-accent-cyan transition">
              FAQ
            </Link>{' '}
            — ответы на частые вопросы; в{' '}
            <Link href="/blog" className="text-accent-pink hover:text-accent-cyan transition">
              блоге
            </Link>{' '}
            — гайды для начинающих и действующих моделей.
          </p>
          <p>
            Подайте заявку на главной странице — менеджер свяжется в Telegram в течение 24 часов и
            предложит персональный план без давления.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/blog/kak-vybrat-onlyfans-agentstvo" className="btn-secondary !py-2.5 !px-5">
            Как выбрать агентство
          </Link>
          <Link href="/faq" className="btn-secondary !py-2.5 !px-5">
            Все вопросы FAQ
          </Link>
        </div>
      </div>
    </section>
  );
}
