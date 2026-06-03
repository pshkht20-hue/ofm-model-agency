'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { modelCases, type ModelCase } from '@/lib/models';
import { SectionHeader } from '@/components/SectionHeader';

function ModelCard({
  model,
  className = '',
  sizes,
  priority = false,
}: {
  model: ModelCase;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] ${className}`}
    >
      <Image
        src={model.image}
        alt={`Кейс модели ${model.name}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute top-4 left-4 right-4 flex justify-between items-start gap-2">
        {model.tag && (
          <span className="px-3 py-1 bg-gold/90 text-[#0a0a0a] text-[10px] font-semibold tracking-widest rounded-full uppercase">
            {model.tag}
          </span>
        )}
        <span className="px-2.5 py-1 bg-black/50 backdrop-blur-md text-[10px] text-white/50 rounded-full border border-white/10">
          кейс #{model.id}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <p className="text-white/50 text-xs tracking-widest mb-1 uppercase">результат с OFM</p>
        <h3 className="font-serif text-2xl md:text-3xl font-normal text-white mb-2">
          {model.name}
        </h3>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-serif text-2xl md:text-3xl text-gold-light">
            {model.earnings}
          </span>
          <span className="text-sm text-white/50">/ месяц</span>
        </div>
        <p className="mt-2 text-sm text-gold/90 tracking-wide">{model.growth} за первые месяцы</p>
      </div>
    </article>
  );
}

export function ModelShowcase() {
  const featured = modelCases.find((m) => m.featured) ?? modelCases[0];
  const rest = modelCases.filter((m) => m.id !== featured.id);

  return (
    <section id="models" className="py-24 md:py-32 bg-[#050508]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="Результаты"
            title="Наши модели"
            description="Девушки, которые уже зарабатывают серьёзные деньги вместе с нами"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="lg:col-span-7"
          >
            <ModelCard
              model={featured}
              className="aspect-[4/5] md:aspect-[4/4.2] min-h-[420px]"
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
            />
          </motion.div>

          <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6">
            {rest.map((model, i) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="flex-1 min-h-[200px]"
              >
                <ModelCard
                  model={model}
                  className="aspect-[16/11] md:aspect-auto h-full min-h-[200px] md:min-h-[240px]"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="btn-secondary !rounded-full"
          >
            Хочу такой же результат
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
