'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { modelCases, type ModelCase } from '@/lib/models';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';

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
    <motion.article
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] hover:border-accent-pink/35 transition-colors duration-300 ${className}`}
    >
      <Image
        src={model.image}
        alt={`Кейс модели ${model.name}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-black/60 to-transparent" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-pink/15 via-transparent to-accent-violet/10" />

      <div className="absolute top-4 left-4 right-4 flex justify-between items-start gap-2 z-10">
        {model.tag && (
          <span className="px-3 py-1 bg-gradient-to-r from-accent-pink to-accent-violet text-white text-[10px] font-semibold tracking-widest rounded-full uppercase">
            {model.tag}
          </span>
        )}
        <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-[10px] text-white/50 rounded-full border border-white/10">
          #{model.id}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
        <p className="text-white/45 text-[10px] tracking-[0.2em] mb-2 uppercase">Результат</p>
        <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">{model.name}</h3>
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-gradient-brand text-2xl md:text-3xl font-medium">{model.earnings}</span>
          <span className="text-sm text-white/50">/ месяц</span>
        </div>
        <p className="mt-2 text-sm text-accent-pink/90">{model.growth}</p>
      </div>
    </motion.article>
  );
}

export function ModelShowcase() {
  const featured = modelCases.find((m) => m.featured) ?? modelCases[0];
  const rest = modelCases.filter((m) => m.id !== featured.id);

  return (
    <SectionShell id="models" wide>
      <SectionHeader
        eyebrow="Кейсы"
        title="Наши модели"
        description="Девушки, которые уже зарабатывают серьёзные деньги вместе с нами"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
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

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <a href="/#contact" className="btn-secondary !rounded-full">
          Хочу такой же результат
          <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>
    </SectionShell>
  );
}
