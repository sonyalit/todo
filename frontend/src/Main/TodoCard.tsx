import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { RootState } from '../types';
import { toggle, editTrue, editTitle } from './todoSlice';
import { Todo } from './types';

function TodoCard({ todo }: { todo: Todo }): JSX.Element {
  const user = useSelector((state: RootState) => state.auth.user);
  const [newTitle, setNewTitle] = useState('');
  const dispatch = useAppDispatch();

  const toggleTodo = (id: number): void => {
    dispatch(toggle(id));
  };
  const editOn = (id: number): void => {
    dispatch(editTrue(id));
  };
  const handleEditTodo = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewTitle(event?.target.value);
  };
  const editTodo = (id: number): void => {
    const data = {
      id,
      newTitle,
    };
    dispatch(editTitle(data));
  };
  return (
    <div>
      {todo.edit === false ? (
        <>
          <div className="card">
            <span>{todo.title}</span>
            <span>Автор: {todo.name}</span>
            <span>email: {todo.email}</span>
            <span>Статус: {todo.isDone ? '✅' : '❌'}</span>
            {todo.updatedByAdmin && <span>Отредактировано администратором</span>}
          </div>
          {user && (
          <>
            <button type="button" onClick={() => editOn(todo.id)}>
              ✏️
            </button>
            <button type="button" onClick={() => toggleTodo(todo.id)}>
              Done!
            </button>
          </>
          )}
        </>
      ) : (
        <div className="card">
        <form onSubmit={() => editTodo(todo.id)}>
          <input
            type="text"
            name="newTodo"
            required
            value={newTitle}
            onChange={handleEditTodo}
          />
          <button type="submit">Confirm</button>
        </form>
        <span>Автор: {todo.name}</span>
            <span>email: {todo.email}</span>
            <span>Статус: {todo.isDone ? '✅' : '❌'}</span>
        </div>
      )}
    </div>
  );
}

export default TodoCard;
