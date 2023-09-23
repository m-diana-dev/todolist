import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists().then((res) => {
            setState(res.data)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('Redux')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = 'c4092666-5bd4-4b55-8d08-648a4c9a6f16'
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistID)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = 'c2d68e32-ea9c-420b-8bdc-86bb086b6068'
    useEffect(() => {
        todolistAPI.updateTodolist(todolistID, 'CSS')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = 'c2d68e32-ea9c-420b-8bdc-86bb086b6068'
    useEffect(() => {
        todolistAPI.getTasks(todolistID).then((res) => {
            setState(res.data)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = 'c2d68e32-ea9c-420b-8bdc-86bb086b6068'
    useEffect(() => {
        todolistAPI.createTask(todolistID, 'Milk').then((res) => {
            setState(res.data)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = 'c2d68e32-ea9c-420b-8bdc-86bb086b6068'
    const taskID = 'd9943542-298e-4ed2-9253-b72107f3088f'
    useEffect(() => {
        todolistAPI.updateTask(todolistID, taskID,'Beer').then((res) => {
            setState(res.data)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = 'c2d68e32-ea9c-420b-8bdc-86bb086b6068'
    const taskID = 'd9943542-298e-4ed2-9253-b72107f3088f'
    useEffect(() => {
        todolistAPI.deleteTask(todolistID, taskID).then((res) => {
            setState(res.data)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}