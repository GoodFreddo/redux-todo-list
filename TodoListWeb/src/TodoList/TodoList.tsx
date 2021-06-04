import React, { FC } from "react";
import "./TodoList.css";
import { TodoListState } from "../state/TodoListReducer";

type todoListProps = TodoListState & {};

export const TodoList: FC<todoListProps> = (props) => {
  return props.isLoading || props.isAdding ? (
    <>Loading...</>
  ) : (
    <ul>
      {props.todoListItems.map((todoListItem, index) => (
        <li id={index + ""} key={index} className="Box Draggable Padded">
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
