'use client';

import { motion } from 'framer-motion';

type ReviewCardProps = {
  name: string;
  earnings: string;
  text: string;
};

export function ReviewCard({ name, earnings, text }: ReviewCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="group card-glass relative p-8 md:p-9 flex flex-col overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-pink/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex-1 relative">
        <div className="flex gap-0.5 text-accent-pink mb-6 text-sm tracking-widest">
          {'★★★★★'.split('').map((star, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
            >
              {star}
            </motion.span>
          ))}
        </div>
        <p className="font-serif text-xl md:text-2xl text-white/90 leading-relaxed">
          <span className="text-accent-pink/60 text-3xl leading-none mr-1">&ldquo;</span>
          {text}
          <span className="text-accent-pink/60 text-3xl leading-none ml-0.5">&rdquo;</span>
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-white/[0.06] relative">
        <div className="font-medium text-base tracking-tight">{name}</div>
        <div className="text-gradient-brand text-sm mt-1.5 font-medium">{earnings}</div>
      </div>
    </motion.article>
  );
}
