import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { RootState } from '../types';
import AddForm from './AddForm';
import TodoCard from './TodoCard';
import {
  getTodoList,
  getTodos,
  getPages,
} from './todoSlice';
import { Tpayload } from './types';

function TodoListPage(): JSX.Element {
  const todos = useSelector(getTodoList);
  const pages = useSelector((state: RootState) => state.todos.pages);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState('');

  const dispatch = useAppDispatch();
  const payload: Tpayload = {
    page: currentPage,
    sort: currentSort,
  };
  useEffect(() => {
    dispatch(getPages());
    dispatch(getTodos(payload));
  }, [dispatch, currentPage, currentSort]);
  function handleSortName(): void {
    setCurrentSort('name');
  }
  function handleSortEmail(): void {
    setCurrentSort('email');
  }
  function handleSortStatus(): void {
    setCurrentSort('isDone');
  }
  function choosePage(page: number): void {
    setCurrentPage(page);
  }

  return (
    <section className="todolist">
      <h2>Задачи</h2>
      <AddForm payload={payload} />

      {!todos.length ? (
        <p>Нет задач</p>
      ) : (
        <>
        <div className="sortButtons">
          Отсортировать
          <button type="button" onClick={handleSortName}>
            По имени
          </button>
          <button type="button" onClick={handleSortEmail}>
            По email
          </button>
          <button type="button" onClick={handleSortStatus}>
            По статусу
          </button>
        </div>
          <div className="todos">
            {todos.map((todo) =>

                <TodoCard key={todo.id} todo={todo} />

            )}
          </div>
          <div className="pages">
            {pages.map((page) => (
              <button
                type="button"
                key={page}
                className={currentPage === page ? 'current-page' : 'page'}
                onClick={() => choosePage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default TodoListPage;
