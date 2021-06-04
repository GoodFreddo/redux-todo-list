import TodoListItem from "../TodoList/TodoListItem";

export interface TodoListState {
  todoListItems: TodoListItem[];
  isLoading: boolean;
  isAdding: boolean;
}

export type AddTodoItem = { type: "todo/AddTodoItem"; payload: TodoListItem };
export type LoadTodoItemsCompleted = {
  type: "todo/LoadTodoItemsCompleted";
  payload: TodoListItem[];
};
export type LoadTodoItemsStarted = { type: "todo/LoadTodoItemsStarted" };
export type RemoveTodoItem = { type: "todo/RemoveTodoItem" };
export type WipeTodoItems = { type: "todo/WipeTodoItems" };
export type SaveTodoItemStarted = { type: "todo/SaveTodoItemStarted" };
export type SaveTodoItemCompleted = {
  type: "todo/SaveTodoItemCompleted";
  payload: TodoListItem[];
};

export type ToDoAction =
  | AddTodoItem
  | LoadTodoItemsCompleted
  | RemoveTodoItem
  | WipeTodoItems
  | LoadTodoItemsStarted
  | SaveTodoItemStarted
  | SaveTodoItemCompleted;

const intialTodoListState: TodoListState = {
  todoListItems: [],
  isLoading: false,
  isAdding: false,
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
        isAdding: false,
      };
    }
    case "todo/LoadTodoItemsStarted": {
      return { ...reducerState, isLoading: true };
    }
    case "todo/LoadTodoItemsCompleted": {
      return {
        ...reducerState,
        todoListItems: action.payload,
        isLoading: false,
      };
    }

    case "todo/SaveTodoItemStarted": {
      return { ...reducerState, isAdding: true };
    }
    case "todo/SaveTodoItemCompleted": {
      return {
        ...reducerState,
        todoListItems: action.payload,
        isAdding: false,
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
