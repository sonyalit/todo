import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main/Main';
import LoginForm from './Login/LoginForm';
import Navbar from './Navbar/Navbar';
import { useAppDispatch } from './store';
import { getUser } from './Login/loginSlice';

function App():JSX.Element {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
