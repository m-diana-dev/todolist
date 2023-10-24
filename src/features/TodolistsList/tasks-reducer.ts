import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setEntityStatusAC,
    SetTodolistsActionType
} from './todolists-reducer'
import {
    RESULT_CODE,
    TaskPriorities,
    TaskStatuses,
    TaskType, TaskTypeWithStatus,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {
    RequestStatusType,
    setErrorAC,
    setErrorActionType,
    setStatusAC,
    setStatusActionType
} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios, {AxiosError} from "axios";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [{...action.task, entityStatus: 'idle'}, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks.map(el => ({...el, entityStatus: 'idle'}))}
        case "SET-ENTITY-STATUS-TASK":
            return {...state, [action.todolistID]: state[action.todolistID].map(el=>el.id===action.taskID?{...el, entityStatus: action.status}:el)}
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

export const setEntityStatusTaskAC = (todolistID: string, taskID: string, status: RequestStatusType) => ({
    type: 'SET-ENTITY-STATUS-TASK',
    todolistID,
    taskID,
    status
} as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            const action = setTasksAC(tasks, todolistId)
            dispatch(action)
            dispatch(setStatusAC('succeeded'))
        })
        .catch(e => {
            if (axios.isAxiosError<ErrorType>(e)) {
                const errorMessage = e.response ? e.response.data.error : e.message
                handleServerNetworkError(dispatch, errorMessage)
            } else {
                handleServerNetworkError(dispatch, (e as Error).message)
            }
        })
}

export type ErrorType = {
    "statusCode": 0,
    "messages": [
        {
            "message": "string",
            field: "string"
        }
    ],
    error: "string"
}
export const removeTaskTC = (taskId: string, todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    dispatch(setEntityStatusTaskAC(todolistId, taskId,'loading'))
    try {
        const res = await todolistsAPI.deleteTask(todolistId, taskId)
        if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
            const action = removeTaskAC(taskId, todolistId)
            dispatch(action)
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const errorMessage = e.response ? e.response.data.error : e.message
            handleServerNetworkError(dispatch, errorMessage)
        } else {
            handleServerNetworkError(dispatch, (e as Error).message)
        }
    }
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError<{ item: TaskType }>(dispatch, res.data)
            }
        })
        .catch((e: AxiosError<ErrorType>) => {
            const errorMessage = e.response ? e.response.data.error : e.message
            handleServerNetworkError(dispatch, errorMessage)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        dispatch(setStatusAC('loading'))
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                    const action = updateTaskAC(taskId, domainModel, todolistId)
                    dispatch(action)
                    dispatch(setStatusAC('succeeded'))
                } else {
                    handleServerAppError<{ item: TaskType }>(dispatch, res.data)
                }
            })
            .catch(e => {
                if (axios.isAxiosError<ErrorType>(e)) {
                    const errorMessage = e.response ? e.response.data.error : e.message
                    handleServerNetworkError(dispatch, errorMessage)
                } else {
                    handleServerNetworkError(dispatch, (e as Error).message)
                }
            })
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskTypeWithStatus>
}
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | setStatusActionType
    | setErrorActionType
    | ReturnType<typeof setEntityStatusTaskAC>