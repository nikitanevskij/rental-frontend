import React from 'react';
import './App.css';
import 'antd/dist/reset.css';
import { Routes, Route } from 'react-router-dom';
import { Registration } from './pages/Registration/Registration';
import { Home } from './pages/Home/Home';
import { LoginPage } from './pages/Login/LoginPage';
import { useAppDispatch } from './store/store';
import { fetchAuthMe } from './store/fetchAuthSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <div>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </div>
  );
};

export default App;
