import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId:string) => void
    changeFilter: (value: FilterValuesType, idTodolist:string) => void
    addTask: (title: string, todoListId:string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string)=>void
    updateTask: (todoListId: string, taskId:string, title:string)=>void
    updateTodoListTitle: (title:string)=>void
}

export function Todolist(props: PropsType) {



    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const onRemoveTodoList = () => {
        props.removeTodoList(props.id)
    }

    const addTaskHandler = (title: string) => {
    props.addTask(title,props.id)
    }
    const updateTaskHandler = (taskId:string, title:string) => {
        props.updateTask(props.id, taskId, title)
    }

    return <div>
        <h3><EditableSpan title={props.title} callback={props.updateTodoListTitle}/></h3>
        <button onClick={onRemoveTodoList}>del</button>
        <AddItemForm callback={addTaskHandler} />
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} callback={(title:string)=>updateTaskHandler(t.id,title)}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
