//1.Исходный state

//2.1.какой тип действия мы хотим выполнить
//2.2.данные необходимые для выполнения необходимого действия
//{type: , payload: } => action

import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todoListId: string
}

export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string,
    todoListId: string
}

export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType,
    todoListId: string
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT
export const todolistsReducer = (todolists: TodoListType[], action: ActionType):TodoListType[] => {
    switch (action.type){
        case "REMOVE-TODOLIST":
            return todolists.filter(el => el.id !== action.todoListId)
        case "ADD-TODOLIST":
            const newTodo: TodoListType = {id: action.todoListId, title: action.title, filter: 'all'}
            return [...todolists, newTodo]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(el => el.id === action.todoListId ? {
                ...el,
                title: action.title
            } : el)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(el => el.id === action.todoListId ? {
                ...el,
                filter: action.filter
            } : el)
        default:
            return todolists
    }
}


export const RemoveTodoListAC = (todoListId: string): RemoveTodoListAT => ({type: "REMOVE-TODOLIST", todoListId:todoListId})

export const AddTodoListAC = (todoListId: string, title: string): AddTodoListAT => ({type: "ADD-TODOLIST", title: title, todoListId:todoListId})

export const ChangeTodoListTitleAC = (todoListId: string, title: string): ChangeTodoListTitleAT=> ({type: "CHANGE-TODOLIST-TITLE", title: title, todoListId:todoListId})

export const ChangeTodoListFilterAC = (todoListId: string, filter: FilterValuesType): ChangeTodoListFilterAT=> ({type: "CHANGE-TODOLIST-FILTER", filter: filter, todoListId:todoListId})