import React, {useState} from 'react';
import {ButtonNameType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number, taskString: string)=>void
}

export function Todolist(props: PropsType) {

    const [filteredTasks, setfilteredTasks] = useState<ButtonNameType>('All')

    const filterTask = (buttonName: ButtonNameType) => {
        setfilteredTasks(buttonName);
    }
    const boxForFilters = ()=>{
        let durshlag = props.tasks;
        if(filteredTasks === 'Active'){
            durshlag = props.tasks.filter(el=> !el.isDone)
        } else if (filteredTasks === 'Completed'){
            durshlag = props.tasks.filter(el=> el.isDone)
        }
        return durshlag;
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {boxForFilters().map((el, index)=>{
                return(
                    <li key={el.id}>
                        <button onClick={()=>props.removeTask(el.id, 'Hello')}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={()=>{filterTask('All')}}>All</button>
            <button onClick={()=>{filterTask('Active')}}>Active</button>
            <button onClick={()=>{filterTask('Completed')}}>Completed</button>
        </div>
    </div>
}
