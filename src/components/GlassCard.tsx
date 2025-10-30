import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const GlassCard = ({ children, className = '', delay = 0 }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative backdrop-blur-xl bg-white/5 dark:bg-black/20 rounded-2xl border border-cyan-500/20
        shadow-[0_8px_32px_0_rgba(6,182,212,0.15)] hover:shadow-[0_8px_48px_0_rgba(6,182,212,0.25)]
        hover:border-cyan-400/40 transition-all duration-300 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-fuchsia-500/5 pointer-events-none" />
      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  );
};
