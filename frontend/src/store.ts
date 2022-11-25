import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import todoSlice from './Main/todoSlice';
import authSlice from './Login/loginSlice';

const store = configureStore({
  reducer: {
    todos: todoSlice,
    auth: authSlice,
  }
});

// тип, выведенный от метода dispatch из хранилища
export type AppDispatch = typeof store.dispatch;

// кастомный хук — типизированная обёртка для useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
