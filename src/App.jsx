import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthPage from './AuthPage';
import LandingPage from './LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/main" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;