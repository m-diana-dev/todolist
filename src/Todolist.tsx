import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from './App/App';
import {AddItemForm} from './AddItemForm/AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {Task} from "./Task";
import {TaskWithRedux} from "./TaskWithRedux";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {
    console.log('Todolist')
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.id]);


    let tasks = props.tasks;

    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    const removeTask = useCallback((idTask: string) => props.removeTask(idTask, props.id),[props.removeTask,props.id])
    const changeTaskStatus = useCallback((id: string, isDone: boolean) => {
        props.changeTaskStatus(id, isDone,props.id);
    },[props.changeTaskStatus, props.id])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
        props.changeTaskTitle(taskId,newTitle,props.id);
    },[props.changeTaskTitle, props.id])

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    return <Task key={t.id}
                                 id={t.id}
                                 isDone={t.isDone}
                                 title={t.title}
                                 removeTask={removeTask}
                                 changeTaskStatus={changeTaskStatus}
                                 changeTaskTitle={changeTaskTitle}/>
                    // return <TaskWithRedux id={t.id} isDone={t.isDone} title={t.title} todolistId={props.id}/>
                })
            }
        </div>
        <div>
            <ButtonWithMemo title={'All'} variant={props.filter === 'all' ? 'outlined' : 'text'} color={'inherit'}
                            onClick={onAllClickHandler}/>
            <ButtonWithMemo title={'Active'} variant={props.filter === 'active' ? 'outlined' : 'text'} color={'primary'}
                            onClick={onActiveClickHandler}/>
            <ButtonWithMemo title={'Completed'} variant={props.filter === 'completed' ? 'outlined' : 'text'}
                            color={'secondary'} onClick={onCompletedClickHandler}/>
        </div>
    </div>
})

type ButtonWithMemoPropsType = {
    title: string
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    variant: 'text' | 'outlined' | 'contained'
    onClick: () => void
}

const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
    return <Button variant={props.variant}
                   onClick={props.onClick}
                   color={props.color}>{props.title}
    </Button>
})

