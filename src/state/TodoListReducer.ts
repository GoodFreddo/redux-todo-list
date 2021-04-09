import TodoListItem from "../TodoList/TodoListItem";
import {createStore, combineReducers, Store} from 'redux'

export interface ApplicationState {
    toDoList: TodoListState;
}

export interface TodoListState {
  todoListItems: TodoListItem[];
}

const intialTodoListState: TodoListState = {
  todoListItems: [
    { title: "Dishes", text: "Do the dishes" },
    { title: "Garbage", text: "Take out the trash" },
    { title: "Pizza party", text: "Have a pizza party" },
  ],
};

export const createAddTodoAction = (title: string, itemText: string) : AddTodoItem => {
  return {
    type: "todo/AddTodoItem",
    payload: { title: title, text: itemText },
  };
};
export const createRemoveTodoAction = () : RemoveTodoItem => {
  return { type: "todo/RemoveTodoItem" };
};

type AddTodoItem = { type: 'todo/AddTodoItem', payload: TodoListItem};
type RemoveTodoItem = { type: 'todo/RemoveTodoItem'}

type ToDoAction = AddTodoItem | RemoveTodoItem

export function toDoList(
  reducerState = intialTodoListState,
  action: ToDoAction
): TodoListState {
  switch (action.type) {
    case "todo/AddTodoItem": {
      console.log("Adding");
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
    default:
      return reducerState;
  }
}

export const rootReducer = combineReducers<ApplicationState>({toDoList});
export const applicationState = createStore(rootReducer);
