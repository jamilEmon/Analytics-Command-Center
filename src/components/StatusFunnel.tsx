import { GlassCard } from './GlassCard';
import { ParsedClientData } from '../services/googleSheets';
import { motion } from 'framer-motion';

interface StatusFunnelProps {
  data: ParsedClientData[];
}

export const StatusFunnel = ({ data }: StatusFunnelProps) => {
  const statusCounts = data.reduce((acc, client) => {
    const status = client.status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const funnelData = Object.entries(statusCounts)
    .map(([status, count]) => ({ status, count }))
    .sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...funnelData.map((d) => d.count));
  const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];

  return (
    <GlassCard delay={0.4}>
      <h3 className="text-xl font-bold text-white mb-6">
        <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
          Status Distribution
        </span>
      </h3>
      <div className="space-y-4">
        {funnelData.map((item, index) => {
          const percentage = (item.count / maxCount) * 100;
          const color = colors[index % colors.length];

          return (
            <motion.div
              key={item.status}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300 font-medium">{item.status}</span>
                <span className="text-gray-400">
                  {item.count} ({((item.count / data.length) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="relative h-10 bg-white/5 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-lg flex items-center justify-center text-white font-semibold"
                  style={{
                    background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
                    boxShadow: `0 0 20px ${color}40`,
                  }}
                >
                  {percentage > 20 && <span className="text-sm">{item.count}</span>}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
};
