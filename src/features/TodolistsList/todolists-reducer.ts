import {RESULT_CODE, TaskType, todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setStatusAC, setStatusActionType} from "../../app/app-reducer";
import axios from "axios";
import {addTaskAC, ErrorType} from "./tasks-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case "SET-ENTITY-STATUS":
            return state.map(el => el.id === action.todolistsID ? {...el, entityStatus: action.status} : el)
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const setEntityStatusAC = (todolistsID: string, status: RequestStatusType) => ({
    type: 'SET-ENTITY-STATUS',
    todolistsID,
    status
} as const)

// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setStatusAC('succeeded'))
            })
            .catch(e=>{
                if(axios.isAxiosError<ErrorType>(e)){
                    const errorMessage = e.response ? e.response.data.error : e.message
                    handleServerNetworkError(dispatch, errorMessage)
                } else {
                    handleServerNetworkError(dispatch, (e as Error).message)
                }
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
        dispatch(setEntityStatusAC(todolistId, 'loading'))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setStatusAC('succeeded'))
            })
            .catch(e=>{
                if(axios.isAxiosError<ErrorType>(e)){
                    const errorMessage = e.response ? e.response.data.error : e.message
                    handleServerNetworkError(dispatch, errorMessage)
                } else {
                    handleServerNetworkError(dispatch, (e as Error).message)
                }
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch(e=>{
                if(axios.isAxiosError<ErrorType>(e)){
                    const errorMessage = e.response ? e.response.data.error : e.message
                    handleServerNetworkError(dispatch, errorMessage)
                } else {
                    handleServerNetworkError(dispatch, (e as Error).message)
                }
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                    dispatch(changeTodolistTitleAC(id, title))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch(e=>{
                if(axios.isAxiosError<ErrorType>(e)){
                    const errorMessage = e.response ? e.response.data.error : e.message
                    handleServerNetworkError(dispatch, errorMessage)
                } else {
                    handleServerNetworkError(dispatch, (e as Error).message)
                }
            })
    }
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type setEntityStatusActionType = ReturnType<typeof setEntityStatusAC>
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | setStatusActionType
    | setEntityStatusActionType
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
