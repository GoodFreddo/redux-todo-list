import { ThunkDispatch } from "redux-thunk";
import TodoListItem from "../TodoList/TodoListItem";
import { ApplicationState } from "./AppStore";
import {
  AddTodoItem,
  LoadTodoItemsCompleted,
  LoadTodoItemsStarted,
  RemoveTodoItem,
  SaveTodoItemCompleted,
  SaveTodoItemStarted,
  ToDoAction,
  TodoListState,
  WipeTodoItems,
} from "./TodoListReducer";

export interface todoListActions {
  saveTodoToServer: (todoListItem: TodoListItem) => void;
  removeTodo: () => void;
  wipeTodos: () => void;
  loadTodosFromServer: () => void;
}

export const createAddTodoAction = (
  title: string,
  itemText: string
): AddTodoItem => {
  return {
    type: "todo/AddTodoItem",
    payload: { title: title, text: itemText },
  };
};

export const createLoadTodoItemsCompletedAction = (
  todos: TodoListItem[]
): LoadTodoItemsCompleted => {
  return { type: "todo/LoadTodoItemsCompleted", payload: todos };
};

export const createRemoveTodoAction = (): RemoveTodoItem => {
  return { type: "todo/RemoveTodoItem" };
};

export const createWipeTodoAction = (): WipeTodoItems => {
  return { type: "todo/WipeTodoItems" };
};

export const creatLoadTodoItemsStartedAction = (): LoadTodoItemsStarted => {
  return { type: "todo/LoadTodoItemsStarted" };
};

export const createSaveTodoItemStartedAction = (): SaveTodoItemStarted => {
  return { type: "todo/SaveTodoItemStarted" };
};

export const createSaveTodoItemCompletedAction = (
  todoItems: TodoListItem[]
): SaveTodoItemCompleted => {
  return { type: "todo/SaveTodoItemCompleted", payload: todoItems };
};

export const createLoadTodosFromServerAction =
  () =>
  async (
    dispatch: ThunkDispatch<TodoListState, void, ToDoAction>,
    getState: () => ApplicationState
  ) => {
    dispatch(creatLoadTodoItemsStartedAction());
    const response = await fetch("http://localhost:62032/api/TodoList", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const todoJson = (await response.json()) as TodoListItem[];
    dispatch(createLoadTodoItemsCompletedAction(todoJson));
  };

export const createAddTodoToServerAction =
  (todoListItem: TodoListItem) =>
  async (
    dispatch: ThunkDispatch<TodoListState, void, ToDoAction>,
    getState: () => ApplicationState
  ) => {
    dispatch(createSaveTodoItemStartedAction());
    const response = await fetch("http://localhost:62032/api/TodoList", {
      method: "POST",
      body: JSON.stringify(todoListItem),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      var responseTodoListitems =
        ((await response.json()) as TodoListItem[]) || [];
      dispatch(createSaveTodoItemCompletedAction(responseTodoListitems));
    } else {
      //dispatch(/*Dispatch failed to add action*/ )
    }
  };
