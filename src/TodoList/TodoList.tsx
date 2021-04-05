import React, { FC } from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.css";

interface todoListProps {
  todoListItems: TodoListItem[];
}

export const TodoList: FC<todoListProps> = (props) => {
  return (
    <ul>
      {props.todoListItems.map((todoListItem, index) => (
        <li className="Box Draggable Padded">
          <span>
            {index + 1}: {todoListItem.title}
          </span>
          <br />
          <span>{todoListItem.text}</span>
        </li>
      ))}
    </ul>
  );
};
