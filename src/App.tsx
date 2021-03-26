import React from "react";
import { TodoList } from "./TodoList/TodoList";
import "./App.css";

function App() {
  return (
    <span className="App">
      <span className="ThirdColumn" />
      <span className="ThirdColumn">
        <TodoList />
      </span>
      <span className="ThirdColumn" />
    </span>
  );
}

export default App;
