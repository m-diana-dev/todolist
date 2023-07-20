import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>





type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | changeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoLIstId]: state[action.todoLIstId].filter(el=>el.id!==action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.todoLIstId]:[{id: v1(), title: 'juice', isDone: false},...state[action.todoLIstId]]}
        case 'CHANGE-TASK-STATUS':
            return {...state, [action.todoLIstId]: state[action.todoLIstId].map(el=>el.id===action.taskId ? {...el, isDone: action.isDone} : el)}
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.todoLIstId]: state[action.todoLIstId].map(el=>el.id===action.taskId ? {...el, title: action.titleTask} : el)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            let {[action.id]: [], ...rest} = state
            return rest
            // let stateCopy = {...state}
            // delete stateCopy[action.id]
            // return stateCopy
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId:string, todoLIstId:string) => {
    return { type: 'REMOVE-TASK', taskId, todoLIstId} as const
}
export const addTaskAC = (taskTitle:string, todoLIstId:string) => {
    return { type: 'ADD-TASK', taskTitle, todoLIstId} as const
}
export const changeTaskStatusAC = (taskId:string, isDone: boolean, todoLIstId:string) => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todoLIstId} as const
}
export const changeTaskTitleAC = (taskId:string, titleTask: string, todoLIstId:string) => {
    return { type: 'CHANGE-TASK-TITLE', taskId, titleTask, todoLIstId} as const
}


