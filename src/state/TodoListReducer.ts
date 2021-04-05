import { Action, AnyAction, configureStore } from "@reduxjs/toolkit";
import TodoListItem from "../TodoList/TodoListItem";

interface todoListState { todoListItems: TodoListItem[] }

const intialTodoListState: todoListState = {
    todoListItems: [
        { title: "Dishes", text: "Do the dishes" },
        { title: "Garbage", text: "Take out the trash" },
        { title: "Pizza party", text: "Have a pizza party" },
    ]
};




export const createAddTodoAction = (title: string, itemText: string) => { return ({ type: 'todo/todoAdd', payload: { title: title, itemText: itemText } }) };
export const createRemoveTodoAction = () => { return ({ type: 'todo/todoRemove', payload: { } }) };

export function todoListReducer(reducerState = intialTodoListState, action: AnyAction): todoListState {
    switch (action.type) {
        case 'todo/todoAdd': {
            console.log("Adding");
            return ({ ...reducerState, todoListItems: [action.payload, ...reducerState.todoListItems] });
        }
        case 'todo/todoRemove':
            {
                return ({ ...reducerState, todoListItems: [...reducerState.todoListItems.slice(1)] });
        }
        default:
            return reducerState;
    }
};


