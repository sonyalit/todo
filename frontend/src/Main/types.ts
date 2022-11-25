export type Todo = { id:number, name:string, email:string, title: string, isDone: boolean, edit:boolean, updatedByAdmin:boolean };
export type NewTodo = { id:number, name:string, email:string, title: string, isDone: boolean };

export type TodosState = {
  title: string,
  list: Todo[],
  pages:number[],
  error:string | null | undefined,
  message:string | null | undefined };

export type Tpayload = { page:number, sort:string };
