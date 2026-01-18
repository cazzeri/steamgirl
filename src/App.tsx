import { GameProvider } from './context/GameContext'
import { GameScreen } from './screens/GameScreen'
import { DemoControls } from './screens/DemoControls';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { StartScreen } from './screens/StartScreen';
import { RootRedirect } from './components/RootRedirect';
import { NotFoundScreen } from './screens/NotFoundScreen';

export function App() {
  return (
    <GameProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/start" element={<StartScreen />} />
          <Route path="/demo" element={<DemoControls />} />
          <Route path="/game" element={<GameScreen />} />
          
          {/* Fallback - 404 screen */}
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  )
}
