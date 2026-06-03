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

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

    {/* ==================== NAVBAR ==================== */}
<nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
  <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-[68px]">
    
    {/* Логотип */}
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center w-9 h-9">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-violet-600 rounded-2xl"></div>
        <div className="absolute inset-[1.5px] bg-black rounded-2xl"></div>
        <div className="relative z-10">
          <span className="text-white font-bold text-[19px] tracking-[-1.5px]">OFM</span>
        </div>
      </div>

      <div>
        <div className="font-semibold text-[17px] tracking-[-0.5px] leading-none">OFM's Model Agency</div>
      </div>
    </div>

    {/* Кнопка */}
    <a 
      href="#contact" 
      className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 active:scale-[0.985] transition-all"
    >
      Стать моделью
      <ArrowRight className="w-4 h-4" />
    </a>
  </div>
</nav>

{/* ==================== HERO СЕКЦИЯ ==================== */}
<section className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
  
  {/* Роскошный фон */}
  <div className="absolute inset-0 bg-[#0a0a0f]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(at_30%_20%,#4c1d95_0%,transparent_50%)]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(at_70%_80%,#831d4e_0%,transparent_55%)]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_0.5px,transparent_1px)] bg-[length:4px_4px]"></div>

  <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
    
    {/* Бейдж */}
    <div className="inline-flex items-center gap-3 bg-black/70 border border-white/30 px-7 py-2.5 rounded-full mb-10 text-sm tracking-[3px] backdrop-blur-xl">
      <Sparkles className="w-4 h-4 text-pink-400" />
      <span className="font-medium text-white">LUXURY ONLYFANS AGENCY</span>
    </div>

    {/* Заголовок */}
    <h1 className="font-serif text-[72px] md:text-[92px] leading-[0.92] tracking-[-3.5px] mb-8">
      Твоя жизнь.<br />
      <span className="text-white/90">Твои правила.</span><br />
      Твой успех.
    </h1>

    {/* Подзаголовок */}
    <p className="max-w-2xl mx-auto text-2xl md:text-3xl text-zinc-300 mb-12 leading-tight tracking-[-0.3px]">
      Эксклюзивное агентство, которое помогает амбициозным девушкам<br />
      зарабатывать от <span className="text-white font-medium">$15,000+</span> в месяц<br />
      и жить так, как они всегда мечтали.
    </p>

    {/* Кнопки */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
      <a 
        href="#contact" 
        className="group inline-flex items-center justify-center gap-3 bg-white text-black text-lg font-semibold px-14 py-5 rounded-2xl hover:bg-white/90 active:scale-[0.985] transition-all shadow-2xl"
      >
        Стать моделью
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
      </a>

      <a 
        href="#models" 
        className="inline-flex items-center justify-center gap-3 border border-white/25 hover:border-white/60 hover:bg-white/5 text-lg font-medium px-10 py-5 rounded-2xl transition-all"
      >
        Посмотреть истории успеха
      </a>
    </div>

    {/* Доверие */}
    <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-white/50 tracking-widest">
      <div>Более <span className="text-white/80">200 моделей</span></div>
      <div>Средний доход <span className="text-white/80">$18,400 / мес</span></div>
      <div>Топ-1% агентств</div>
    </div>
  </div>

  {/* Индикатор прокрутки */}
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs tracking-[3px] z-20">
    
    <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"></div>
  </div>
</section>

      {/* ==================== TRUST BAR / ГЛАВНЫЕ ЦИФРЫ ==================== */}
<section className="border-y border-white/10 bg-zinc-950 py-12">
  <div className="max-w-6xl mx-auto px-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 text-center">
      
      <div>
        <div className="text-5xl font-semibold tracking-tighter text-white">200+</div>
        <div className="mt-2 text-sm text-white/60 tracking-widest">МОДЕЛЕЙ В АГЕНТСТВЕ</div>
      </div>

      <div>
        <div className="text-5xl font-semibold tracking-tighter text-white">$18.4M</div>
        <div className="mt-2 text-sm text-white/60 tracking-widest">ЗАРАБОТАНО МОДЕЛЯМИ</div>
      </div>

      <div>
        <div className="text-5xl font-semibold tracking-tighter text-white">94%</div>
        <div className="mt-2 text-sm text-white/60 tracking-widest">СРЕДНИЙ РОСТ ДОХОДА</div>
      </div>

      <div>
        <div className="text-5xl font-semibold tracking-tighter text-white">24/7</div>
        <div className="mt-2 text-sm text-white/60 tracking-widest">ПОДДЕРЖКА И ЧАТЫ</div>
      </div>

    </div>
  </div>
</section>

      {/* ==================== ПОЧЕМУ ВЫБИРАЮТ НАС ==================== */}
<section id="about" className="py-24 bg-black">
  <div className="max-w-6xl mx-auto px-8">
    
    {/* Заголовок */}
    <div className="text-center mb-16">
      <div className="text-pink-500 text-sm tracking-[3px] mb-3">ПРЕИМУЩЕСТВА</div>
      <h2 className="text-6xl font-bold tracking-tighter">Почему выбирают нас</h2>
      <p className="mt-4 text-xl text-white/60 max-w-md mx-auto">
        Мы помогаем моделям не просто зарабатывать, а строить настоящую карьеру
      </p>
    </div>

    {/* Карточки преимуществ */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {[
        {
          icon: Users,
          title: "Личный менеджер",
          desc: "Закреплённый менеджер работает с тобой 7 дней в неделю. Помогает с контентом, стратегией и общением с фанами."
        },
        {
          icon: TrendingUp,
          title: "Мощный маркетинг",
          desc: "Профессиональное продвижение, реклама и работа с трафиком. Мы знаем, как привлекать платёжеспособных фанатов."
        },
        {
          icon: Award,
          title: "Реальные результаты",
          desc: "Средний доход наших моделей — от $12,000 до $35,000+ в месяц. Многие увеличивают заработок в 3–5 раз."
        },
        {
          icon: Shield,
          title: "Полная конфиденциальность",
          desc: "Защита личности, юридическая поддержка и строгие правила конфиденциальности. Твоя безопасность — наш приоритет."
        },
        {
          icon: Heart,
          title: "Индивидуальный подход",
          desc: "Мы не используем шаблоны. Для каждой модели разрабатывается персональная стратегия роста."
        },
        {
          icon: Zap,
          title: "Быстрый старт",
          desc: "От подачи заявки до первых выплат обычно проходит 7–14 дней. Мы помогаем запуститься максимально быстро."
        }
      ].map((item, index) => (
        <div 
          key={index} 
          className="group bg-zinc-950 border border-white/10 p-9 rounded-3xl hover:border-pink-500/40 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 mb-8 group-hover:bg-pink-500/10 transition-colors">
            <item.icon className="w-7 h-7 text-pink-500" />
          </div>
          
          <h3 className="text-2xl font-semibold tracking-tight mb-4">{item.title}</h3>
          <p className="text-white/70 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ==================== КАК МЫ РАБОТАЕМ ==================== */}
<section id="how" className="py-24 bg-zinc-950">
  <div className="max-w-6xl mx-auto px-8">
    
    {/* Заголовок секции */}
    <div className="text-center mb-16">
      <div className="text-pink-500 text-sm tracking-[3px] mb-3">ПРОЗРАЧНЫЙ ПРОЦЕСС</div>
      <h2 className="text-6xl font-bold tracking-tighter">Как мы работаем</h2>
      <p className="mt-4 text-xl text-white/60 max-w-lg mx-auto">
        Простой и понятный процесс из 6 этапов. Никаких скрытых условий.
      </p>
    </div>

    {/* Шаги */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          num: "01",
          title: "Подача заявки",
          desc: "Ты заполняешь короткую форму. Это занимает всего 3–4 минуты. Никаких лишних вопросов на старте."
        },
        {
          num: "02",
          title: "Первичная оценка",
          desc: "В течение 24 часов мы изучаем твой профиль и связываемся с тобой для короткого разговора."
        },
        {
          num: "03",
          title: "Личное знакомство",
          desc: "Проводим детальное интервью. Обсуждаем твои цели, текущую ситуацию и возможности сотрудничества."
        },
        {
          num: "04",
          title: "Разработка стратегии",
          desc: "Создаём индивидуальный план: контент-стратегия, ценообразование, продвижение и цели на первые месяцы."
        },
        {
          num: "05",
          title: "Подготовка и запуск",
          desc: "Помогаем с настройкой профиля, созданием контента, запуском рекламы и первым выходом на платформу."
        },
        {
          num: "06",
          title: "Рост и поддержка",
          desc: "Постоянный мониторинг, оптимизация, еженедельные отчёты и работа над увеличением твоего дохода."
        }
      ].map((step, index) => (
        <div 
          key={index} 
          className="group bg-black border border-white/10 p-9 rounded-3xl hover:border-pink-500/40 transition-all duration-300 flex flex-col"
        >
          <div className="text-6xl font-bold text-pink-500/90 mb-8 tracking-tighter group-hover:text-pink-500 transition-colors">
            {step.num}
          </div>
          
          <h3 className="text-2xl font-semibold tracking-tight mb-4">{step.title}</h3>
          <p className="text-white/70 leading-relaxed flex-1">{step.desc}</p>
        </div>
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