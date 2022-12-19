import React from 'react';
import './App.css';
import 'antd/dist/reset.css';
import { Routes, Route } from 'react-router-dom';
import { Registration } from './pages/Registration/Registration';
import { Home } from './pages/Home/Home';

export const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Registration />} />
      </Routes>
    </div>
  );
};

export default App;
