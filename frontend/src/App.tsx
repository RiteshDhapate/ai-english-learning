import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AIAssistant from './pages/AIAssistant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/assistant" element={<AIAssistant />} />
      </Routes>
    </Router>
  );
}

export default App;