import TodoListItem from "../TodoList/TodoListItem";
import { createStore, combineReducers, Store, Middleware } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

export interface TodoListState {
  todoListItems: TodoListItem[];
}

type AddTodoItem = { type: "todo/AddTodoItem"; payload: TodoListItem };
type RemoveTodoItem = { type: "todo/RemoveTodoItem" };
type WipeTodoItems = { type: "todo/WipeTodoItems" };
type PromiseGetTodo = { type: "todo/GetTodoItems"; payload: Promise<Function> };

export const createAddTodoAction = (
  title: string,
  itemText: string
): AddTodoItem => {
  return {
    type: "todo/AddTodoItem",
    payload: { title: title, text: itemText },
  };
};
export const createRemoveTodoAction = (): RemoveTodoItem => {
  return { type: "todo/RemoveTodoItem" };
};

export const createWipeTodoAction = (): WipeTodoItems => {
  return { type: "todo/WipeTodoItems" };
};

// export const createFetchTodoAction = ():PromiseGetTodo=>
// {
//   return{ type: 'todo/GetTodoItems',payload:{promise:
//     fetch("http://localhost:62032/api/TodoList")
//       .then((response) => response.json())
//       .then((response) => {
//         return response as TodoListItem[];
//       })
//       .then(//do thunking here);
//   }}
// }

type ToDoAction = AddTodoItem | RemoveTodoItem | WipeTodoItems;

const intialTodoListState: TodoListState = {
  todoListItems: [
    { title: "Dishes", text: "Do the dishes" },
    { title: "Garbage", text: "Take out the trash" },
    { title: "Pizza party", text: "Have a pizza party" },
  ],
};

export function toDoListReducer(
  reducerState = intialTodoListState,
  action: ToDoAction
): TodoListState {
  switch (action.type) {
    case "todo/AddTodoItem": {
      return {
        ...reducerState,
        todoListItems: [action.payload, ...reducerState.todoListItems],
      };
    }
    case "todo/RemoveTodoItem": {
      return {
        ...reducerState,
        todoListItems: [...reducerState.todoListItems.slice(1)],
      };
    }
    case "todo/WipeTodoItems": {
      return { ...reducerState, todoListItems: [] };
    }
    default:
      return reducerState;
  }
}
