import { AuthState } from './Login/types';
import { TodosState } from './Main/types';

export type RootState = {
  todos: TodosState,
  auth: AuthState,
};
