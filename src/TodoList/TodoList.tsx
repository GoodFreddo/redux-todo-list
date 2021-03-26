import React, { FC, useCallback } from "react";
import { TodoListItem } from "./TodoListItem";
import "./TodoList.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

let todoListItems: TodoListItem[] = [
  { title: "Dishes", text: "Do the dishes", order: 2 },
  { title: "Garbage", text: "Take out the trash", order: 3 },
  { title: "Pizza party", text: "Have a pizza party", order: 1 },
];

export const TodoList: FC = () => {
  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="todoItems">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="Padded Box"
          >
            {todoListItems
              .sort((first, second) => first.order - second.order)
              .map((todoListItem, index) => (
                <Draggable
                  key={todoListItem.title}
                  draggableId={todoListItem.title}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="Box Draggable Padded"
                    >
                      <span>
                        {todoListItem.order}:{todoListItem.title}
                      </span>
                      <span>{todoListItem.text}</span>
                    </li>
                  )}
                </Draggable>
              ))}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
