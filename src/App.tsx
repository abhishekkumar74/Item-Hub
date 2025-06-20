import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ItemProvider } from './context/ItemContext';
import { Navigation } from './components/Navigation';
import { ViewItems } from './pages/ViewItems';
import { AddItems } from './pages/AddItems';

function App() {
  return (
    <ItemProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<ViewItems />} />
              <Route path="/add" element={<AddItems />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ItemProvider>
  );
}

export default App;