import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { toDoListReducer, TodoListState } from "./TodoListReducer";

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
