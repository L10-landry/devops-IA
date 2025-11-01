
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import HomePage from '@/pages/HomePage';
import IDEPage from '@/pages/IDEPage';
import LibraryPage from '@/pages/LibraryPage';
import VoiceAssistantPage from '@/pages/VoiceAssistantPage';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="code-assistant-theme">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ide" element={<IDEPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/voice" element={<VoiceAssistantPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;