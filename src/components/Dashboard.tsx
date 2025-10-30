import { useState, useEffect } from 'react';
import { fetchGoogleSheetData, ParsedClientData } from '../services/googleSheets';
import { KPICard } from './KPICard';
import { RevenueChart } from './RevenueChart';
import { HeadshotsChart } from './HeadshotsChart';
import { StatusFunnel } from './StatusFunnel';
import { ClientTable } from './ClientTable';
import { ChatBot } from './ChatBot';
import { DollarSign, Users, Camera, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const Dashboard = () => {
  const [data, setData] = useState<ParsedClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchGoogleSheetData();
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to load data from Google Sheets');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-center">
          <p className="text-xl font-bold mb-2">Error Loading Data</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const totalRevenue = data.reduce((sum, client) => sum + client.price, 0);
  const totalClients = data.length;
  const totalHeadshots = data.reduce((sum, client) => sum + client.headshots, 0);
  const avgPrice = totalClients > 0 ? totalRevenue / totalClients : 0;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent animate-glow">
              Analytics Command Center
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Real-time client metrics and performance insights</p>
        </motion.div>

        <div className="flex justify-end mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-semibold
              hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2"
          >
            Refresh Page
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Revenue"
            value={totalRevenue}
            prefix="$"
            decimals={0}
            icon={DollarSign}
            iconColor="text-green-400"
            delay={0}
          />
          <KPICard
            title="Total Clients"
            value={totalClients}
            icon={Users}
            iconColor="text-cyan-400"
            delay={0.1}
          />
          <KPICard
            title="Total Headshots"
            value={totalHeadshots}
            icon={Camera}
            iconColor="text-fuchsia-400"
            delay={0.2}
          />
          <KPICard
            title="Avg Price/Client"
            value={avgPrice}
            prefix="$"
            decimals={0}
            icon={TrendingUp}
            iconColor="text-yellow-400"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart data={data} />
          <HeadshotsChart data={data} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ClientTable data={data} />
          </div>
          <StatusFunnel data={data} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChatBot />
          </div>
        </div>
      </div>
    </div>
  );
};
