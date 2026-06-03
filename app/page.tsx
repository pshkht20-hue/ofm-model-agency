'use client';

import { 
  Sparkles, 
  ArrowRight, 
  Users, 
  TrendingUp, 
  Award, 
  Shield, 
  Heart, 
  Zap,
  MessageCircle, 
  BarChart3, 
  Camera 
} from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { Navbar } from '@/components/Navbar';
import { Logo } from '@/components/Logo';
import { ModelShowcase } from '@/components/ModelShowcase';
import { SectionHeader } from '@/components/SectionHeader';
import { motion } from 'framer-motion';
import { useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
// Компонент для анимации цифр
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.8,
      ease: "easeOut",
    });
    return controls.stop;
  }, [motionValue, value]);

  return (
    <span>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

interface AnimatedStatProps {
  number: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

function AnimatedStat({ number, suffix = "", prefix = "", label, decimals = 0 }: AnimatedStatProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => 
    decimals > 0 ? latest.toFixed(decimals) : Math.floor(latest)
  );
  const [displayValue, setDisplayValue] = useState<string | number>(0);

  useEffect(() => {
    const controls = animate(count, number, {
      duration: 1.8,
      ease: "easeOut",
    });
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => { controls.stop(); unsubscribe(); };
  }, [number]);

  return (
    <div>
      <div className="font-serif text-5xl md:text-6xl font-normal tracking-tight text-white flex items-baseline justify-center gap-1">
        {prefix}
        <motion.span>{displayValue}</motion.span>
        {suffix}
      </div>
      <div className="label-stat mt-3">{label}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050508] text-[#f4f2ef] overflow-x-hidden premium-grain">

    <Navbar />

{/* ==================== HERO СЕКЦИЯ ==================== */}
<section className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
  
  {/* Фон */}
  <div className="absolute inset-0 bg-[#050508]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(88,28,135,0.35),transparent)]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(131,29,78,0.2),transparent)]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_0%_80%,rgba(201,168,124,0.08),transparent)]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_0.5px,transparent_1px)] bg-[length:3px_3px]"></div>

  <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
    
    {/* Бейдж */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="badge-luxury mb-12"
    >
      <Sparkles className="w-3.5 h-3.5 text-gold" />
      <span>Luxury OnlyFans Agency</span>
    </motion.div>

    {/* Заголовок (появляется по строкам) */}
    <div className="heading-display text-[clamp(3rem,10vw,5.75rem)] mb-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Твоя жизнь.
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
      >
        <span className="italic text-gold-light/95">Твои правила.</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        Твой успех.
      </motion.div>
    </div>

    {/* Подзаголовок */}
    <motion.p 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.0 }}
      className="text-lead max-w-2xl mx-auto mb-14"
    >
      Эксклюзивное агентство для амбициозных моделей —<br className="hidden sm:block" />
      доход от <span className="text-gold-light font-normal">$15,000+</span> в месяц<br className="hidden sm:block" />
      и полная поддержка на каждом этапе.
    </motion.p>

    {/* Кнопки */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
      <motion.a 
        href="#contact" 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="btn-primary group"
      >
        Стать моделью
        <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      </motion.a>

      <motion.a 
        href="#models" 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.45 }}
        className="btn-secondary"
      >
        Посмотреть истории успеха
      </motion.a>
    </div>

    {/* Trust signals */}
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.7 }}
      className="flex flex-wrap justify-center gap-x-12 gap-y-3 text-xs tracking-[0.2em] uppercase text-white/40"
    >
      <div>Более <span className="text-gold-light">200</span> моделей</div>
      <div>Средний доход <span className="text-gold-light">$18,400</span></div>
      <div>Топ-1% агентств</div>
    </motion.div>
  </div>

  {/* Индикатор прокрутки */}
<motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 2.0 }}
  className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 text-[9px] tracking-[0.35em] z-20 uppercase"
>
  Листайте вниз
  <div className="w-px h-6 bg-gradient-to-b from-white/15 to-transparent"></div>
</motion.div>
</section>
{/* ==================== TRUST BAR ==================== */}
<section id="results" className="border-y border-white/[0.06] bg-[#0a0a10] py-16 md:py-20">
  <div className="max-w-6xl mx-auto px-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 text-center">
      <AnimatedStat number={200} suffix="+" label="МОДЕЛЕЙ В АГЕНТСТВЕ" />
      <AnimatedStat number={18.4} suffix="M" prefix="$" label="ЗАРАБОТАНО МОДЕЛЯМИ" decimals={1} />
      <AnimatedStat number={94} suffix="%" label="СРЕДНИЙ РОСТ ДОХОДА" />
      <AnimatedStat number={24} suffix="/7" label="ПОДДЕРЖКА И ЧАТЫ" />
    </div>
  </div>
</section>
      {/* ==================== ПОЧЕМУ ВЫБИРАЮТ НАС ==================== */}
<section id="about" className="py-24 md:py-32 bg-[#050508]">
  <div className="max-w-6xl mx-auto px-5 md:px-8">
    <SectionHeader eyebrow="Преимущества" title="Почему выбирают нас" />

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {[
        { icon: Users, title: "Личный менеджер", desc: "Закреплённый менеджер работает с тобой 7 дней в неделю." },
        { icon: TrendingUp, title: "Мощный маркетинг", desc: "Профессиональное продвижение и работа с трафиком." },
        { icon: Award, title: "Реальные результаты", desc: "Средний доход наших моделей — от $12,000 до $35,000+ в месяц." },
        { icon: Shield, title: "Полная конфиденциальность", desc: "Защита личности и юридическая поддержка." },
        { icon: Heart, title: "Индивидуальный подход", desc: "Персональная стратегия под каждую модель." },
        { icon: Zap, title: "Быстрый старт", desc: "От заявки до первых выплат обычно 7–14 дней." }
      ].map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group card-premium p-8 md:p-9"
        >
          <div className="icon-wrap mb-7 group-hover:border-gold/40 transition-colors">
            <item.icon className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <h3 className="heading-card mb-3">{item.title}</h3>
          <p className="text-body">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* ==================== КАК МЫ РАБОТАЕМ ==================== */}
<section id="how" className="py-24 md:py-32 bg-[#0a0a10]">
  <div className="max-w-6xl mx-auto px-5 md:px-8">
    <SectionHeader eyebrow="Процесс" title="Как мы работаем" />

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {[
        { num: "01", title: "Подача заявки", desc: "Ты заполняешь короткую форму. Это занимает всего 3–4 минуты." },
        { num: "02", title: "Первичная оценка", desc: "В течение 24 часов мы изучаем твой профиль и связываемся с тобой." },
        { num: "03", title: "Личное знакомство", desc: "Проводим детальное интервью и обсуждаем возможности сотрудничества." },
        { num: "04", title: "Разработка стратегии", desc: "Создаём индивидуальный план: контент, ценообразование и продвижение." },
        { num: "05", title: "Подготовка и запуск", desc: "Помогаем с настройкой профиля, созданием контента и первым выходом." },
        { num: "06", title: "Рост и поддержка", desc: "Постоянный мониторинг, еженедельные отчёты и работа над ростом дохода." }
      ].map((step, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          viewport={{ once: true }}
          className="group card-premium p-8 md:p-9 flex flex-col"
        >
          <div className="font-serif text-5xl text-gold/80 mb-6 tracking-tight group-hover:text-gold transition-colors">
            {step.num}
          </div>
          <h3 className="heading-card mb-3">{step.title}</h3>
          <p className="text-body flex-1">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      <ModelShowcase />

{/* ==================== ОТЗЫВЫ МОДЕЛЕЙ ==================== */}
<section id="reviews" className="py-24 md:py-32 bg-[#0a0a10]">
  <div className="max-w-6xl mx-auto px-5 md:px-8">
    <SectionHeader
      eyebrow="Отзывы"
      title="Что говорят наши модели"
      description="Девушки, которые уже изменили свою жизнь вместе с нами"
    />

    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
      
      {[
        {
          name: "Анна, 24 года",
          earnings: "Зарабатываю $28k+/мес",
          text: "За 5 месяцев я увеличила свой доход в 4 раза. Личный менеджер реально помогает каждый день. Никогда не думала, что можно зарабатывать такие деньги на OnlyFans."
        },
        {
          name: "Виктория, 27 лет",
          earnings: "Зарабатываю $19k+/мес",
          text: "Очень понравился индивидуальный подход. Мне не просто управляют аккаунтом, а реально помогают развиваться как бренду. Команда всегда на связи."
        },
        {
          name: "София, 22 года",
          earnings: "Зарабатываю $32k+/мес",
          text: "Самое лучшее решение в моей жизни. За полгода я прошла путь от $3k до $32k в месяц. Маркетинг и стратегия на высшем уровне."
        },
        {
          name: "Мария, 25 лет",
          earnings: "Зарабатываю $24k+/мес",
          text: "Очень ценю конфиденциальность и профессионализм. Всё чётко, без лишней воды. Менеджер всегда даёт полезные советы и помогает с контентом."
        }
      ].map((review, index) => (
        <div 
          key={index} 
          className="card-premium p-8 md:p-9 flex flex-col"
        >
          <div className="flex-1">
            <div className="text-gold text-sm tracking-widest mb-6">★★★★★</div>
            <p className="font-serif text-xl md:text-2xl text-white/90 leading-relaxed italic">
              &ldquo;{review.text}&rdquo;
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <div className="font-medium text-base tracking-tight">{review.name}</div>
            <div className="text-gold-light/90 text-sm mt-1.5 tracking-wide">{review.earnings}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ==================== ЧТО МЫ ПРЕДЛАГАЕМ (УСЛУГИ) ==================== */}
<section className="py-24 md:py-32 bg-[#050508]">
  <div className="max-w-6xl mx-auto px-5 md:px-8">
    <SectionHeader
      eyebrow="Услуги"
      title="Что мы предлагаем"
      description="Полный спектр услуг для максимального роста вашего аккаунта"
    />

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      
      {[
        {
          icon: Users,
          title: "Управление аккаунтом",
          desc: "Полное ведение твоего OnlyFans: от настройки профиля до ежедневной работы с контентом и фанами."
        },
        {
          icon: MessageCircle,
          title: "Чаты 24/7",
          desc: "Профессиональные чат-менеджеры отвечают на сообщения фанатов круглосуточно, увеличивая продажи."
        },
        {
          icon: TrendingUp,
          title: "Маркетинг и продвижение",
          desc: "Стратегия привлечения новых подписчиков через рекламу, соцсети и партнёрские программы."
        },
        {
          icon: Camera,
          title: "Контент-стратегия",
          desc: "Разработка контент-плана, помощь в съёмках и создание продающего визуального стиля."
        },
        {
          icon: BarChart3,
          title: "Аналитика и рост",
          desc: "Еженедельные отчёты, анализ поведения фанатов и постоянная оптимизация дохода."
        },
        {
          icon: Shield,
          title: "Конфиденциальность и защита",
          desc: "Полная защита твоей личности, юридическая поддержка и контроль утечек контента."
        }
      ].map((service, index) => (
        <div 
          key={index} 
          className="group card-premium p-8 md:p-9 flex flex-col"
        >
          <div className="icon-wrap mb-7">
            <service.icon className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <h3 className="heading-card mb-3">{service.title}</h3>
          <p className="text-body flex-1">{service.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ==================== ФИНАЛЬНЫЙ ПРИЗЫВ К ДЕЙСТВИЮ ==================== */}
<section id="contact" className="py-24 md:py-32 bg-[#050508] relative overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(76,29,149,0.25),transparent)]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_0%,rgba(201,168,124,0.06),transparent)]"></div>
  
  <div className="max-w-4xl mx-auto px-5 md:px-8 text-center relative z-10">
    <p className="eyebrow mb-6">Следующий шаг</p>
    <h2 className="heading-section text-[clamp(2.5rem,6vw,4.25rem)] mb-8">
      Готова начать
      <br />
      <span className="italic text-gold-light/90">зарабатывать по-настоящему?</span>
    </h2>
    <p className="text-lead max-w-2xl mx-auto mb-12">
      Оставьте заявку — менеджер свяжется с вами в Telegram в течение 24 часов.
    </p>

    <div className="mb-10">
      <ContactForm />
    </div>

    {/* Trust signals */}
    <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-xs tracking-[0.15em] uppercase text-white/40">
      <div className="flex items-center gap-2">
        <Shield className="w-3.5 h-3.5 text-gold" /> Конфиденциальность
      </div>
      <div className="flex items-center gap-2">
        <Zap className="w-3.5 h-3.5 text-gold" /> Ответ за 24 часа
      </div>
      <div className="flex items-center gap-2">
        <Heart className="w-3.5 h-3.5 text-gold" /> Поддержка 24/7
      </div>
    </div>
  </div>
</section>
{/* ==================== FOOTER ==================== */}
<footer className="bg-[#030306] border-t border-white/[0.06] py-16 md:py-20">
  <div className="max-w-7xl mx-auto px-5 md:px-8">
    
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-12">
      
      {/* Логотип и описание */}
      <div className="lg:col-span-2">
        
        <Logo size="lg" href="#" wordmarkOnMobile className="mb-6" />

        <p className="max-w-md text-body">
          Премиальное агентство, которое помогает амбициозным девушкам строить успешную карьеру на OnlyFans с полной конфиденциальностью и поддержкой.
        </p>
      </div>

      {/* Навигация */}
      <div>
        <div className="eyebrow mb-6 !text-[10px]">Навигация</div>
        <div className="flex flex-col gap-y-3 text-sm text-white/55">
          <a href="#about" className="hover:text-gold-light transition">О нас</a>
          <a href="#how" className="hover:text-gold-light transition">Как мы работаем</a>
          <a href="#models" className="hover:text-gold-light transition">Модели</a>
          <a href="#results" className="hover:text-gold-light transition">Результаты</a>
          <a href="#reviews" className="hover:text-gold-light transition">Отзывы</a>
        </div>
      </div>

      {/* Контакты */}
      <div>
        <div className="eyebrow mb-6 !text-[10px]">Связь</div>
        <div className="flex flex-col gap-y-3 text-sm text-white/55">
          <a href="#contact" className="hover:text-gold-light transition">Подать заявку</a>
          <div className="text-white/50">Ответим в течение 24 часов</div>
          <div className="text-white/50 mt-2">Полная конфиденциальность</div>
        </div>
      </div>
    </div>

    {/* Нижняя часть */}
    <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-y-4 text-xs text-white/40 tracking-wide">
      <div>
        © {new Date().getFullYear()} OFM's Model Agency. Все права защищены.
      </div>
      <div className="flex gap-x-6">
        <a href="#" className="hover:text-gold-light transition">Политика конфиденциальности</a>
        <a href="#" className="hover:text-gold-light transition">Условия использования</a>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}