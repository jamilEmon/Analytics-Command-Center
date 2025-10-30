import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
