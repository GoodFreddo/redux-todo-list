import React, { Dispatch, FC, useState } from "react";
import { TodoList } from "./TodoList/TodoList";
import "./App.css";
import TodoListItem from "./TodoList/TodoListItem";
import {
  ApplicationState,
  createAddTodoAction,
  createRemoveTodoAction,
  toDoList,
  TodoListState,
} from "./state/TodoListReducer";
import { connect } from "react-redux";

const mapStateToProps = (state: ApplicationState) => {
  return { todoListItems: state.toDoList.todoListItems };
};

const App: FC<{
  todoListItems: TodoListItem[];
  addTodo: (title: string, text: string) => void;
  removeTodo: () => void;
}> = ({ todoListItems, addTodo, removeTodo }) => {
  const [title, setTitle] = useState("");
  const [itemText, setItemText] = useState("");

  return (
    <span className="App">
      <span className="ThirdColumn" />
      <p>
        <button
          onClick={() => {
            addTodo(title, itemText);
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
      <button onClick={removeTodo}>Remove an item</button>
      <span className="ThirdColumn">
        <TodoList todoListItems={todoListItems} />
      </span>
      <span className="ThirdColumn" />
    </span>
  );
};

const ConnectedApp = connect(mapStateToProps, {
  addTodo: createAddTodoAction,
  removeTodo: createRemoveTodoAction,
})(App);

export default ConnectedApp;
