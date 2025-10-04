import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PokemonDetailPage from './pages/PokemonDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;