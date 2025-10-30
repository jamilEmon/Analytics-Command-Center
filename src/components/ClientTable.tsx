import { useState, useMemo } from 'react';
import { GlassCard } from './GlassCard';
import { ParsedClientData } from '../services/googleSheets';
import { Search, Mail, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface ClientTableProps {
  data: ParsedClientData[];
}

export const ClientTable = ({ data }: ClientTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const statuses = ['All', ...Array.from(new Set(data.map((d) => d.status)))];

  const filteredData = useMemo(() => {
    return data.filter((client) => {
      const matchesSearch =
        client.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || client.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  return (
    <GlassCard delay={0.5}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h3 className="text-xl font-bold text-white">
          <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
            Client Directory
          </span>
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400
                focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-lg text-white
              focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
          >
            {statuses.map((status) => (
              <option key={status} value={status} className="bg-gray-900">
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/20">
              <th className="text-left py-3 px-4 text-gray-400 font-semibold">Client</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold">Email</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold">Headshots</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold">Revenue</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((client, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="py-4 px-4 text-white font-medium">{client.client}</td>
                <td className="py-4 px-4">
                  <a
                    href={`mailto:${client.email}`}
                    className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Mail size={14} className="mr-2" />
                    <span className="text-sm">{client.email}</span>
                  </a>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <TrendingUp size={14} className="mr-2 text-fuchsia-400" />
                    <span className="text-white">{client.headshots}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-green-400 font-semibold">
                    ${client.price.toLocaleString()}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      client.status.toLowerCase().includes('completed') ||
                      client.status.toLowerCase().includes('done')
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : client.status.toLowerCase().includes('active') ||
                          client.status.toLowerCase().includes('progress')
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}
                  >
                    {client.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-400">No clients found matching your criteria.</div>
        )}
      </div>
    </GlassCard>
  );
};
