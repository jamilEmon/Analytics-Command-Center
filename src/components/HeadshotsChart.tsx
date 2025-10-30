import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { GlassCard } from './GlassCard';
import { ParsedClientData } from '../services/googleSheets';

interface HeadshotsChartProps {
  data: ParsedClientData[];
}

export const HeadshotsChart = ({ data }: HeadshotsChartProps) => {
  const chartData = data
    .sort((a, b) => b.headshots - a.headshots)
    .slice(0, 10)
    .map((client) => ({
      name: client.client.substring(0, 15) + (client.client.length > 15 ? '...' : ''),
      headshots: client.headshots,
    }));

  const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  return (
    <GlassCard delay={0.3}>
      <h3 className="text-xl font-bold text-white mb-6">
        <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
          Top Clients by Headshots
        </span>
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <defs>
            {colors.map((color, index) => (
              <linearGradient key={index} id={`colorBar${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.9} />
                <stop offset="95%" stopColor={color} stopOpacity={0.3} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="name"
            stroke="#6b7280"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
            }}
            labelStyle={{ color: '#06b6d4' }}
            itemStyle={{ color: '#d946ef' }}
          />
          <Bar dataKey="headshots" radius={[8, 8, 0, 0]}>
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={`url(#colorBar${index % colors.length})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
};
