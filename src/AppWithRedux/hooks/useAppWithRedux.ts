import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {useCallback} from "react";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    RemoveTaskActionType
} from "../../state/tasks-reducer";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "../../state/todolists-reducer";
import {FilterValuesType, TasksStateType, TodolistType} from "../AppWithRedux";

export function useAppWithRedux(){
    const todolists= useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks= useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = useCallback((id: string, todolistId: string)=> {
        let action: RemoveTaskActionType = removeTaskAC(id, todolistId)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        let action = addTaskAC(title, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        let action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        let action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        let action = ChangeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        let action = RemoveTodolistAC(id)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        let action = ChangeTodolistTitleAC(id, title)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        let action = AddTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    return {
        todolists,
        tasks,
        removeTask,
        addTask,
        changeStatus,
        changeTaskTitle,
        changeFilter,
        removeTodolist,
        changeTodolistTitle,
        addTodolist
    }
}