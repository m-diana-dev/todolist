import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('');

    const addTaskHandler = () => {
        props.addTask(title);
        setTitle('');
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler();
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    // const removeTaskHandler = (tID: string) =>{
    //     props.removeTask(tID)
    // }

    const changeFilterAll = () => {
        props.changeFilter("all");
    }
    const changeFilterActive = () => {
        props.changeFilter("active");
    }
    const changeFilterCompleted = () => {
        props.changeFilter("completed");
    }

    const tsarChangeFilter = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue);
    }

    const mappedTasks = props.tasks.map(t => {
            const removeTaskHandler = () => {
                props.removeTask(t.id)
            }
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <Button name={'x'} callBack={removeTaskHandler}/>
                </li>
            )
        }
    )
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onKeyDown={onKeyDownHandler} onChange={onChangeHandler}/>
            {/*<button onClick={addTaskHandler}>+</button>*/}
            <Button name={'+'} callBack={addTaskHandler}/>
        </div>
        <ul>
            {mappedTasks}
        </ul>
        <div>
            <Button name={'All'} callBack={() => tsarChangeFilter('all')}/>
            <Button name={'Active'} callBack={() => tsarChangeFilter('active')}/>
            <Button name={'Completed'} callBack={() => tsarChangeFilter('completed')}/>
        </div>
    </div>
}
