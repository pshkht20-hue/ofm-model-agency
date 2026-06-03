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
import Image from 'next/image';
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
      <div className="text-5xl font-semibold tracking-tighter text-white flex items-baseline justify-center gap-1">
        {prefix}
        <motion.span>{displayValue}</motion.span>
        {suffix}
      </div>
      <div className="mt-2 text-sm text-white/60 tracking-widest">{label}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

    {/* ==================== NAVBAR ==================== */}
<nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
  <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-20">
    
    {/* Логотип */}
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center w-9 h-9 md:w-11 md:h-11">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-violet-600 rounded-2xl"></div>
        <div className="absolute inset-[1.5px] bg-black rounded-2xl"></div>
        <div className="relative z-10">
          <span className="text-white font-bold text-[19px] md:text-[22px] tracking-[-1.5px]">OFM</span>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="font-semibold text-[17px] md:text-[21px] tracking-[-0.5px] leading-none">OFM's Model Agency</div>
        <div className="text-[9px] md:text-[10px] text-white/50 tracking-[1.5px] -mt-0.5">LUXURY ONLYFANS MANAGEMENT</div>
      </div>
    </div>

    {/* Меню (только на десктопе) */}
    <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider">
      <a href="#about" className="hover:text-pink-400 transition">О нас</a>
      <a href="#how" className="hover:text-pink-400 transition">Как мы работаем</a>
      <a href="#models" className="hover:text-pink-400 transition">Модели</a>
      <a href="#results" className="hover:text-pink-400 transition">Результаты</a>
      <a href="#reviews" className="hover:text-pink-400 transition">Отзывы</a>
    </div>

    {/* Кнопки */}
    <div className="flex items-center gap-2 md:gap-3">
      <a 
        href="#contact" 
        className="hidden md:block px-5 py-2.5 text-sm font-medium border border-white/25 rounded-full hover:bg-white/5 transition"
      >
        Подать заявку
      </a>

      <a 
        href="#contact" 
        className="bg-white text-black px-5 md:px-7 py-2.5 md:py-[13px] rounded-full text-sm font-semibold flex items-center gap-2 active:scale-[0.985] transition"
      >
        Стать моделью
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  </div>
</nav>

{/* ==================== HERO СЕКЦИЯ ==================== */}
<section className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
  
  {/* Фон */}
  <div className="absolute inset-0 bg-[#0a0a0f]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(at_30%_20%,#4c1d95_0%,transparent_50%)]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(at_70%_80%,#831d4e_0%,transparent_55%)]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_0.5px,transparent_1px)] bg-[length:4px_4px]"></div>

  <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
    
    {/* Бейдж */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-3 bg-black/70 border border-white/30 px-7 py-2.5 rounded-full mb-10 text-sm tracking-[3px] backdrop-blur-xl"
    >
      <Sparkles className="w-4 h-4 text-pink-400" />
      <span className="font-medium text-white">LUXURY ONLYFANS AGENCY</span>
    </motion.div>

    {/* Заголовок (появляется по строкам) */}
    <div className="font-serif text-[72px] md:text-[92px] leading-[0.92] tracking-[-3.5px] mb-8">
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
        <span className="text-white/90">Твои правила.</span>
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
      className="max-w-2xl mx-auto text-2xl md:text-3xl text-zinc-300 mb-12 leading-tight tracking-[-0.3px]"
    >
      Эксклюзивное агентство, которое помогает амбициозным девушкам<br />
      зарабатывать от <span className="text-white font-medium">$15,000+</span> в месяц<br />
      и жить так, как они всегда мечтали.
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
        className="group inline-flex items-center justify-center gap-3 bg-white text-black text-lg font-semibold px-14 py-5 rounded-2xl hover:bg-white/90 transition-all shadow-2xl"
      >
        Стать моделью
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
      </motion.a>

      <motion.a 
        href="#models" 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.45 }}
        className="inline-flex items-center justify-center gap-3 border border-white/25 hover:border-white/60 hover:bg-white/5 text-lg font-medium px-10 py-5 rounded-2xl transition-all"
      >
        Посмотреть истории успеха
      </motion.a>
    </div>

    {/* Trust signals */}
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.7 }}
      className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-white/50 tracking-widest"
    >
      <div>Более <span className="text-white/80">200 моделей</span></div>
      <div>Средний доход <span className="text-white/80">$18,400 / мес</span></div>
      <div>Топ-1% агентств</div>
    </motion.div>
  </div>

  {/* Индикатор прокрутки */}
<motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 2.0 }}
  className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/15 text-[9px] tracking-[4px] z-20"
>
  SCROLL TO EXPLORE
  <div className="w-px h-6 bg-gradient-to-b from-white/15 to-transparent"></div>
</motion.div>
</section>
{/* ==================== TRUST BAR ==================== */}
<section className="border-y border-white/10 bg-zinc-950 py-14">
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
<section id="about" className="py-24 bg-black">
  <div className="max-w-6xl mx-auto px-8">
    
    <div className="text-center mb-16">
      <div className="text-pink-500 text-sm tracking-[3px] mb-3">ПРЕИМУЩЕСТВА</div>
      <h2 className="text-6xl font-bold tracking-tighter">Почему выбирают нас</h2>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          className="group bg-zinc-950 border border-white/10 p-9 rounded-3xl hover:border-pink-500/40 transition-all"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 mb-8 group-hover:bg-pink-500/10 transition-colors">
            <item.icon className="w-7 h-7 text-pink-500" />
          </div>
          <h3 className="text-2xl font-semibold tracking-tight mb-4">{item.title}</h3>
          <p className="text-white/70 leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* ==================== КАК МЫ РАБОТАЕМ ==================== */}
<section id="how" className="py-24 bg-zinc-950">
  <div className="max-w-6xl mx-auto px-8">
    
    <div className="text-center mb-16">
      <div className="text-pink-500 text-sm tracking-[3px] mb-3">ПРОЗРАЧНЫЙ ПРОЦЕСС</div>
      <h2 className="text-6xl font-bold tracking-tighter">Как мы работаем</h2>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          className="group bg-black border border-white/10 p-9 rounded-3xl hover:border-pink-500/40 transition-all flex flex-col"
        >
          <div className="text-6xl font-bold text-pink-500/90 mb-8 tracking-tighter group-hover:text-pink-500 transition-colors">
            {step.num}
          </div>
          <h3 className="text-2xl font-semibold tracking-tight mb-4">{step.title}</h3>
          <p className="text-white/70 leading-relaxed flex-1">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* ==================== НАШИ МОДЕЛИ / РЕЗУЛЬТАТЫ ==================== */}
<section id="models" className="py-24 bg-black">
  <div className="max-w-7xl mx-auto px-8">
    
    <div className="text-center mb-16">
      <div className="text-pink-500 text-sm tracking-[3px] mb-3">РЕАЛЬНЫЕ РЕЗУЛЬТАТЫ</div>
      <h2 className="text-6xl font-bold tracking-tighter">Наши модели</h2>
      <p className="mt-4 text-xl text-white/60 max-w-lg mx-auto">
        Девушки, которые уже зарабатывают серьёзные деньги вместе с нами
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          name: "Анна",
          earnings: "$28,400",
          growth: "+340% за 4 месяца",
          img: "https://picsum.photos/id/1011/800/600"
        },
        {
          name: "Виктория",
          earnings: "$19,700",
          growth: "+210% за 3 месяца",
          img: "https://picsum.photos/id/1005/800/600"
        },
        {
          name: "София",
          earnings: "$32,100",
          growth: "+480% за 5 месяцев",
          img: "https://picsum.photos/id/1009/800/600"
        }
      ].map((model, index) => (
        <div 
          key={index} 
          className="group relative aspect-[4/3.2] rounded-3xl overflow-hidden cursor-pointer bg-zinc-900"
        >
          <Image 
            src={model.img} 
            alt={model.name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="mb-3">
              <span className="px-3 py-1 bg-pink-500 text-xs font-medium tracking-widest rounded-full">
                TOP MODEL
              </span>
            </div>
            
            <div className="text-white text-3xl font-semibold tracking-tight mb-1">{model.name}</div>
            
            <div className="flex items-baseline gap-3">
              <div className="text-2xl font-semibold text-emerald-400">{model.earnings}</div>
              <div className="text-sm text-white/60">/ месяц</div>
            </div>
            
            <div className="text-sm text-white/70 mt-1">{model.growth}</div>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center mt-12">
      <a 
        href="#contact" 
        className="inline-flex items-center gap-3 border border-white/30 hover:border-white px-8 py-4 rounded-2xl text-sm font-medium transition-all"
      >
        Посмотреть больше историй успеха <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  </div>
</section>

{/* ==================== ОТЗЫВЫ МОДЕЛЕЙ ==================== */}
<section id="reviews" className="py-24 bg-zinc-950">
  <div className="max-w-6xl mx-auto px-8">
    
    {/* Заголовок */}
    <div className="text-center mb-16">
      <div className="text-pink-500 text-sm tracking-[3px] mb-3">РЕАЛЬНЫЕ ИСТОРИИ</div>
      <h2 className="text-6xl font-bold tracking-tighter">Что говорят наши модели</h2>
      <p className="mt-4 text-xl text-white/60 max-w-lg mx-auto">
        Девушки, которые уже изменили свою жизнь вместе с нами
      </p>
    </div>

    {/* Отзывы */}
    <div className="grid md:grid-cols-2 gap-6">
      
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
          className="bg-black border border-white/10 p-9 rounded-3xl hover:border-pink-500/40 transition-all flex flex-col"
        >
          <div className="flex-1">
            <div className="text-pink-500 mb-6">
              ★★★★★
            </div>
            
            <p className="text-lg text-white/90 leading-relaxed">
              “{review.text}”
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="font-semibold text-lg">{review.name}</div>
            <div className="text-emerald-400 text-sm mt-1">{review.earnings}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ==================== ЧТО МЫ ПРЕДЛАГАЕМ (УСЛУГИ) ==================== */}
<section className="py-24 bg-black">
  <div className="max-w-6xl mx-auto px-8">
    
    {/* Заголовок */}
    <div className="text-center mb-16">
      <div className="text-pink-500 text-sm tracking-[3px] mb-3">НАШИ УСЛУГИ</div>
      <h2 className="text-6xl font-bold tracking-tighter">Что мы предлагаем</h2>
      <p className="mt-4 text-xl text-white/60 max-w-lg mx-auto">
        Полный спектр услуг для максимального роста твоего аккаунта
      </p>
    </div>

    {/* Услуги */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      
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
          className="group bg-zinc-950 border border-white/10 p-9 rounded-3xl hover:border-pink-500/40 transition-all flex flex-col"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 mb-8 group-hover:bg-pink-500/10 transition-colors">
            <service.icon className="w-7 h-7 text-pink-500" />
          </div>
          
          <h3 className="text-2xl font-semibold tracking-tight mb-4">{service.title}</h3>
          <p className="text-white/70 leading-relaxed flex-1">{service.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ==================== ФИНАЛЬНЫЙ ПРИЗЫВ К ДЕЙСТВИЮ ==================== */}
<section id="contact" className="py-24 bg-gradient-to-b from-zinc-950 to-black relative overflow-hidden">
  
  {/* Декоративный фон */}
  <div className="absolute inset-0 bg-[radial-gradient(at_center,#4c1d95_0%,transparent_70%)] opacity-40"></div>
  
  <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
    
    <div className="mb-8">
      <div className="inline-block px-5 py-2 bg-white/5 border border-white/10 rounded-full text-sm tracking-[2px] mb-6">
        ПОСЛЕДНИЙ ШАГ К НОВОЙ ЖИЗНИ
      </div>
    </div>

    <h2 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
      Готова начать<br />зарабатывать по-настоящему?
    </h2>

    <p className="text-2xl text-white/70 max-w-2xl mx-auto mb-12 leading-tight">
      Оставь заявку прямо сейчас. Наш менеджер свяжется с тобой в течение 24 часов и расскажет все детали.
    </p>

    {/* Кнопка */}
    <div className="mb-10">
      <a 
        href="#contact" 
        className="inline-flex items-center justify-center gap-4 bg-white text-black text-xl font-semibold px-16 py-6 rounded-2xl hover:bg-white/90 active:scale-[0.985] transition-all shadow-2xl"
      >
        Подать заявку
        <ArrowRight className="w-6 h-6" />
      </a>
    </div>

    {/* Trust signals */}
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/50">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4" /> Полная конфиденциальность
      </div>
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4" /> Ответ в течение 24 часов
      </div>
      <div className="flex items-center gap-2">
        Полная поддержка
      </div>
    </div>
  </div>
</section>
{/* ==================== FOOTER ==================== */}
<footer className="bg-black border-t border-white/10 py-16">
  <div className="max-w-7xl mx-auto px-8">
    
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-12">
      
      {/* Логотип и описание */}
      <div className="lg:col-span-2">
        
        {/* === ПРЕМИАЛЬНЫЙ ЛОГОТИП === */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex items-center justify-center w-11 h-11">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-violet-600 rounded-2xl"></div>
            <div className="absolute inset-[1.5px] bg-black rounded-2xl"></div>
            <div className="relative z-10 flex flex-col items-center justify-center">
              <span className="text-white font-bold text-[22px] tracking-[-1.5px] leading-none">OFM</span>
            </div>
          </div>

          <div>
            <div className="font-semibold text-[21px] tracking-[-0.5px] leading-none">OFM's Model Agency</div>
            <div className="text-[10px] text-white/50 tracking-[2px] -mt-0.5">LUXURY ONLYFANS MANAGEMENT</div>
          </div>
        </div>
        {/* === КОНЕЦ ЛОГОТИПА === */}

        <p className="max-w-md text-white/60 leading-relaxed">
          Премиальное агентство, которое помогает амбициозным девушкам строить успешную карьеру на OnlyFans с полной конфиденциальностью и поддержкой.
        </p>
      </div>

      {/* Навигация */}
      <div>
        <div className="font-semibold mb-6 tracking-wider text-sm">НАВИГАЦИЯ</div>
        <div className="flex flex-col gap-y-3 text-white/70">
          <a href="#about" className="hover:text-white transition">О нас</a>
          <a href="#how" className="hover:text-white transition">Как мы работаем</a>
          <a href="#models" className="hover:text-white transition">Модели</a>
          <a href="#results" className="hover:text-white transition">Результаты</a>
          <a href="#reviews" className="hover:text-white transition">Отзывы</a>
        </div>
      </div>

      {/* Контакты */}
      <div>
        <div className="font-semibold mb-6 tracking-wider text-sm">СВЯЗАТЬСЯ С НАМИ</div>
        <div className="flex flex-col gap-y-3 text-white/70">
          <a href="#contact" className="hover:text-white transition">Подать заявку</a>
          <div className="text-white/50">Ответим в течение 24 часов</div>
          <div className="text-white/50 mt-2">Полная конфиденциальность</div>
        </div>
      </div>
    </div>

    {/* Нижняя часть */}
    <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-y-4 text-sm text-white/50">
      <div>
        © {new Date().getFullYear()} OFM's Model Agency. Все права защищены.
      </div>
      <div className="flex gap-x-6">
        <a href="#" className="hover:text-white transition">Политика конфиденциальности</a>
        <a href="#" className="hover:text-white transition">Условия использования</a>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}