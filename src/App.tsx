import { useState, useEffect } from 'react';
import { Header, Screen } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { MenuScreen } from './components/MenuScreen';
import { QuizScreen } from './components/QuizScreen';
import { FeedbackScreen } from './components/FeedbackScreen';
import { ReflectionScreen } from './components/ReflectionScreen';

export default function App() {
  // Sync state with URL hash for seamless GitHub Pages navigation and history support
  const getInitialScreen = (): Screen => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (hash === 'menu') return 'menu';
    if (hash === 'quiz') return 'quiz';
    if (hash === 'feedback') return 'feedback';
    if (hash === 'reflection') return 'reflection';
    return 'home';
  };

  const [currentScreen, setCurrentScreen] = useState<Screen>(getInitialScreen);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['home', 'menu', 'quiz', 'feedback', 'reflection'].includes(hash)) {
        setCurrentScreen(hash as Screen);
      } else if (!hash) {
        setCurrentScreen('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    window.location.hash = screen === 'home' ? '' : `#/${screen}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* Top Bar Navigation */}
      <Header currentScreen={currentScreen} onNavigate={navigateTo} />

      {/* Main Screen Content (Screens displayed separately) */}
      <main className="flex-1">
        {currentScreen === 'home' && (
          <HomeScreen
            onStart={() => navigateTo('menu')}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'menu' && (
          <MenuScreen
            onSelectOption={(target) => navigateTo(target)}
            onBackHome={() => navigateTo('home')}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizScreen
            onBackToMenu={() => navigateTo('menu')}
          />
        )}

        {currentScreen === 'feedback' && (
          <FeedbackScreen
            onBackToMenu={() => navigateTo('menu')}
          />
        )}

        {currentScreen === 'reflection' && (
          <ReflectionScreen
            onBackToMenu={() => navigateTo('menu')}
          />
        )}
      </main>

      {/* Minimal Academic Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">EduAssess AI</span>
            <span>·</span>
            <span>Probability & Statistics Course Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('menu')}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              Assessment Menu
            </button>
            <button
              onClick={() => navigateTo('quiz')}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              Quiz
            </button>
            <button
              onClick={() => navigateTo('feedback')}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              Feedback
            </button>
            <button
              onClick={() => navigateTo('reflection')}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              Reflection
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
