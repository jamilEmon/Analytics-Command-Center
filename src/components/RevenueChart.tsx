import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GlassCard } from './GlassCard';
import { ParsedClientData } from '../services/googleSheets';

interface RevenueChartProps {
  data: ParsedClientData[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  const chartData = data.map((client) => ({
    name: client.client.substring(0, 15) + (client.client.length > 15 ? '...' : ''),
    revenue: client.price,
  }));

  return (
    <GlassCard delay={0.2}>
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
          Revenue Breakdown
        </span>
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#d946ef" stopOpacity={0.1} />
            </linearGradient>
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
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#06b6d4"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </GlassCard>
  );
};
