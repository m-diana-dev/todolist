import React, {ChangeEvent, FC, useState} from 'react';
import {FilterValuesType} from "./App";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import {faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from '@mui/material/Button';
import {Checkbox, IconButton} from "@mui/material";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

type TodoListPropsType = {
    todoLIstId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (nextFilterValue: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string)=>void
    changeTodoListTitle: (title:string, todoListId: string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList: FC<TodoListPropsType> = (props) => {
    const maxTaskTitleLength = 15
    const tasksList = (props.tasks.length === 0)
        ? <p>TodoList is empty</p>
        : <ul className={"tasks-list"}>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(task.id, props.todoLIstId)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoLIstId)
                    const changeTaskTitle = (title: string)=> {
                        props.changeTaskTitle(task.id,title,props.todoLIstId)
                    }
                    return (
                        <li key={task.id} className={"tasks-list-item"}>
                            <div>
                                <Checkbox size={"small"} checked={task.isDone}
                                          onChange={changeTaskStatus}/>
                                <EditableSpan classes={task.isDone ? "task-done" : "task"} title={task.title} changeTitle={changeTaskTitle}/>
                            </div>
                            <IconButton size={'small'} onClick={removeTask}>
                                <HighlightOffRoundedIcon/>
                            </IconButton>
                        </li>
                    )
                })
            }
        </ul>

    const addTask = (title:string) => props.addTask(title, props.todoLIstId)
    const changeTodoListTitle = (title: string)=> {
        props.changeTodoListTitle(title, props.todoLIstId)
    }
    return (
        <div className="todoList">
            <h3 className={"todolist-header"}>
                <EditableSpan title={props.title} classes={''} changeTitle={changeTodoListTitle}/>
                <IconButton size={'small'} onClick={()=>props.removeTodoList(props.todoLIstId)}>
                    <HighlightOffRoundedIcon/>
                </IconButton>
            </h3>
            <AddItemForm maxItemTitleLength={maxTaskTitleLength} addItem={addTask}/>
            {tasksList}
            <div className={"buttons-block"}>
                <Button variant={"contained"} size={"small"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={() => props.changeFilter("all", props.todoLIstId)}>All
                </Button>
                <Button variant={"contained"} size={"small"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={() => props.changeFilter("active", props.todoLIstId)}>Active
                </Button>
                <Button variant={"contained"} size={"small"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={() => props.changeFilter("completed", props.todoLIstId)}>Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;