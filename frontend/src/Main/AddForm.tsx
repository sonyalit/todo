import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import {
 addNewTodo, getPages, getTodos, resetMessage
} from './todoSlice';
import { NewTodo, Tpayload } from './types';
import './styles.css';
import { RootState } from '../types';

function AddForm({ payload }:{ payload:Tpayload }): JSX.Element {
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const message = useSelector((state:RootState) => state.todos.message);

  function handleTodo(event: React.ChangeEvent<HTMLInputElement>): void {
    setTodo(event.target.value);
  }
  function handleEmail(event: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
  }
  function handleName(event: React.ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }
  const addTodo = (event: React.FormEvent): void => {
    event.preventDefault();

    const isValid = todo && email;
    if (!isValid) return;

    const data:NewTodo = {
      id: Date.now(),
      name,
      email,
      title: todo,
      isDone: false,
    };
    dispatch(addNewTodo(data));
    setEmail('');
    setTodo('');
    setName('');
    dispatch(getTodos(payload));
    dispatch(getPages());
  };
  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(resetMessage());
    }, 5000);
    return () => clearTimeout(id);
  }, [message, dispatch]);

  return (
    <form className="addform" onSubmit={addTodo}>
      <label>
        Name
      </label>
        <input type="text" name="name" required value={name} onChange={handleName} />
      <label>
        Email
      </label>
        <input type="email" name="email" required value={email} onChange={handleEmail} />
      <label>
        Todo
      </label>
        <input type="text" name="todo" required value={todo} onChange={handleTodo} />
      <button type="submit">Создать задачу</button>
      <div>{message && <div className="login-formP">{message}</div>}</div>
    </form>
  );
}

export default AddForm;
