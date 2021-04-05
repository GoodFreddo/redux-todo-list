import React, { FC, useState } from "react";
import { TodoList } from "./TodoList/TodoList";
import "./App.css";
import TodoListItem from "./TodoList/TodoListItem";
import { configureStore } from "@reduxjs/toolkit";
import {
  createAddTodoAction,
  createRemoveTodoAction,
  todoListReducer,
} from "./state/TodoListReducer";

const todoListStore = configureStore({ reducer: todoListReducer });

export const App: FC = () => {
  const [title, setTitle] = useState("");
  const [itemText, setItemText] = useState("");

  return (
    <span className="App">
      <span className="ThirdColumn" />
      <p>
        <button
          onClick={() => {
            todoListStore.dispatch(createAddTodoAction(title, itemText));
            console.log(todoListStore.getState().todoListItems);
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
      <button
        onClick={() => {
          todoListStore.dispatch(createRemoveTodoAction());
          console.log(todoListStore.getState().todoListItems);
        }}
      >
        Remove an item
      </button>
      <span className="ThirdColumn">
        <TodoList todoListItems={todoListStore.getState().todoListItems} />
      </span>
      <span className="ThirdColumn" />
    </span>
  );
};
