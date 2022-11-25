import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';
import {
 TodosState, Todo, Tpayload, NewTodo
} from './types';

const initialState: TodosState = {
  title: 'Список задач',
  list: [],
  pages: [1],
  error: null,
  message: null,
};
export const addNewTodo = createAsyncThunk(
  'newTodo/addnewTodo',
  (todo:NewTodo) => {
    const fetchNewTodo = async (): Promise<string> => {
      const response = await fetch('/api/todos/new', {
        method: 'post',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({ todo }),
      });
      const data = await response.json();
      return data.message;
    };
    return fetchNewTodo();
  }
);
export const getPages = createAsyncThunk(
  'todos/getPages',
  () => {
    const fetchPages = async (): Promise<[number]> => {
      const response = await fetch('/api/todos/pages');
      const data = await response.json();
      return data.pages;
    };
    return fetchPages();
  }
);
export const getTodos = createAsyncThunk(
  'todos/getTodos',
  (params:Tpayload) => {
    const fetchNewTodo = async (): Promise<Todo[]> => {
      const response = await fetch('/api/todos', {
        method: 'post',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({ params }),
      });
      const data = await response.json();
      return data.todos;
    };
    return fetchNewTodo();
  }
);
export const editTitle = createAsyncThunk(
  'todos/editTodos',
  (payload:{ id:number, newTitle:string }) => {
    const fetchNewTodo = async (): Promise<Todo> => {
      const { newTitle } = payload;
      const response = await fetch(`/api/todos/edit/${payload.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({ newTitle }),
      });
      const data = await response.json();
      return data.updatedTodo;
    };
    return fetchNewTodo();
  }
);
export const toggle = createAsyncThunk(
  'todos/toggleTodos',
  (id:number) => {
    const toggleTodo = async (): Promise<Todo> => {
      const response = await fetch(`/api/todos/toggle/${id}`, {
        method: 'put',
      });
      const data = await response.json();
      return data.updatedTodo;
    };
    return toggleTodo();
  }
);
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    editTrue: (state, action) => {
      const index = state.list.findIndex((todo) => todo.id === action.payload);
      state.list[index].edit = true;
    },
    resetMessage: (state) => {
      state.message = null;
  },
  },
  extraReducers: (builder) => {
builder
.addCase(addNewTodo.fulfilled, (state, action) => {
  state.message = action.payload;
})
.addCase(addNewTodo.rejected, (state, action) => {
  state.error = action.error.message;
})
.addCase(getPages.fulfilled, (state, action) => {
  state.pages = action.payload;
})
.addCase(getPages.rejected, (state, action) => {
  state.error = action.error.message;
})
.addCase(getTodos.fulfilled, (state, action) => {
  state.list = action.payload.map((el) => ({ ...el, edit: false }));
})
.addCase(getTodos.rejected, (state, action) => {
  state.error = action.error.message;
})
.addCase(editTitle.fulfilled, (state, action) => {
  state.list = state.list.map((el) => {
    if (el.id === action.payload.id) {
       el = { ...action.payload, edit: false };
    }
    return el;
  });
})
.addCase(editTitle.rejected, (state, action) => {
  state.error = action.error.message;
})
.addCase(toggle.fulfilled, (state, action) => {
  state.list = state.list.map((el) => {
    if (el.id === action.payload.id) {
       el = { ...action.payload, edit: false };
    }
    return el;
  });
})
.addCase(toggle.rejected, (state, action) => {
  state.error = action.error.message;
});
  }
});

export default todoSlice.reducer;
export const { editTrue, resetMessage } = todoSlice.actions;
export const getTodoList = (state: RootState):Todo[] => state.todos.list;
