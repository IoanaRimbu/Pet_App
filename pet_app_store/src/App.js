import './App.css';
import LandingPage from './pages/LandingPage';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import PetsList from './pages/PetsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pets" element={<PetsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
