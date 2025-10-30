import { GlassCard } from './GlassCard';
import { AnimatedCounter } from './AnimatedCounter';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface KPICardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  icon: LucideIcon;
  trend?: number;
  delay?: number;
  iconColor?: string;
}

export const KPICard = ({
  title,
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  icon: Icon,
  trend,
  delay = 0,
  iconColor = 'text-cyan-400',
}: KPICardProps) => {
  return (
    <GlassCard delay={delay}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-2">{title}</p>
          <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
            <AnimatedCounter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
          </div>
          {trend !== undefined && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.5 }}
              className={`mt-2 text-sm flex items-center ${
                trend >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              <span>{trend >= 0 ? '↑' : '↓'}</span>
              <span className="ml-1">{Math.abs(trend)}%</span>
            </motion.div>
          )}
        </div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`p-3 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 rounded-xl ${iconColor}`}
        >
          <Icon size={24} />
        </motion.div>
      </div>
    </GlassCard>
  );
};
