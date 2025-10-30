import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-cyan-500/30
        hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <Moon className="text-cyan-400" size={20} />
        ) : (
          <Sun className="text-yellow-400" size={20} />
        )}
      </motion.div>
    </motion.button>
  );
};
