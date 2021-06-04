import React, { FC, useState } from "react";
import { connect } from "react-redux";
import "./App.css";
import { ApplicationState } from "./state/AppStore";
import {
  createAddTodoToServerAction,
  createLoadTodosFromServerAction,
  createRemoveTodoAction,
  createWipeTodoAction,
  todoListActions as TodoListActions,
} from "./state/TodoListActions";
import { TodoListState } from "./state/TodoListReducer";
import { TodoList } from "./TodoList/TodoList";

const mapStateToProps = (state: ApplicationState) => {
  return {
    ...state.toDoListReducer,
  };
};

const mapDispatchToProps = () => {
  return {
    saveTodoToServer: createAddTodoToServerAction,
    removeTodo: createRemoveTodoAction,
    wipeTodos: createWipeTodoAction,
    loadTodosFromServer: createLoadTodosFromServerAction,
  };
};

type props = TodoListState & TodoListActions;

const App: FC<props> = ({
  saveTodoToServer,
  removeTodo,
  wipeTodos,
  loadTodosFromServer,
  isAdding,
  ...props
}) => {
  const [title, setTitle] = useState("");
  const [itemText, setItemText] = useState("");

  return (
    <span className="App">
      <span className="ThirdColumn" />
      <p>
        <button
          disabled={isAdding}
          onClick={() => {
            saveTodoToServer({ title, text: itemText });
          }}
        >
          Add an item
        </button>
        <textarea
          placeholder="Title"
          onChange={(event) => {
            setTitle(event.currentTarget.value);
          }}
        ></textarea>
        <textarea
          placeholder="Text"
          onChange={(event) => setItemText(event.currentTarget.value)}
        ></textarea>
      </p>
      <button onClick={loadTodosFromServer}>Load todos from the server</button>
      <button onClick={removeTodo}>Remove an item</button>
      <button onClick={wipeTodos}>Remove everything</button>
      <span className="ThirdColumn">
        <TodoList {...{ isAdding, ...props }} />
      </span>
      <span className="ThirdColumn" />
    </span>
  );
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
