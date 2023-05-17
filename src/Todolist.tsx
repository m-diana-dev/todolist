import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskID: string, checkedValue: boolean) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>('');
    const [buttonName, setButtonName] = useState<FilterValuesType>('all')

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }

    }

    // const onAllClickHandler = () => {
    //     props.changeFilter("all");
    //     setButtonName('all')
    // }
    // const onActiveClickHandler = () => {
    //     props.changeFilter("active");
    //     setButtonName('active')
    // }
    // const onCompletedClickHandler = () => {
    //     props.changeFilter("completed");
    //     setButtonName('completed')
    // }

    const tsarHandler=(value: FilterValuesType)=>{
        props.changeFilter(value);
        setButtonName(value)
    }

    const changeFilterStatus = (id:string, e:boolean) => {
        props.changeStatus(id, e);
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? styles.error : ''} value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    // const changeFilterStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeStatus(t.id, e.currentTarget.checked);
                    //     // console.log(e.currentTarget.checked)
                    // }
                    return <li key={t.id} className={(t.isDone) ? styles.isDone: undefined}>
                        <input type="checkbox" checked={t.isDone} onChange={(e: ChangeEvent<HTMLInputElement>)=>{changeFilterStatus(t.id, e.currentTarget.checked)}}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={buttonName === 'all' ? styles.activeFilter: ''} onClick={()=>{tsarHandler('all')}}>All</button>
            <button className={buttonName === 'active' ? styles.activeFilter: ''} onClick={()=>{tsarHandler('active')}}>Active</button>
            <button className={buttonName === 'completed' ? styles.activeFilter : ''} onClick={()=>{tsarHandler('completed')}}>Completed</button>
        </div>
    </div>
}
