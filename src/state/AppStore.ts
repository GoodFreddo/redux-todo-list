import TodoListItem from "../TodoList/TodoListItem";
import { createStore, combineReducers, Store, Middleware } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { TodoListState, toDoListReducer } from "./TodoListReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export interface ApplicationState {
  toDoListReducer: TodoListState;
}

export const rootReducer = combineReducers<ApplicationState>({
  toDoListReducer,
});
export const applicationState = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
