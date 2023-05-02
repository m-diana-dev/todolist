import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type ButtonNameType = 'All' | 'Active' | 'Completed'

function App() {
// создай юсСтейт +
// засетай buttonName+
// используй в ифе


    // let tasks1 = [
    //     { id: 1, title: "HTML&CSS", isDone: true },
    //     { id: 2, title: "JS", isDone: true },
    //     { id: 3, title: "ReactJS", isDone: false }
    // ]

    let [tasks, setTasks] = useState(
        [
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "ReactJS", isDone: false}
        ]
    )

    const removeTask = (taskId: number, taskString: string) => {
        setTasks(tasks.filter(el => el.id !== taskId))
    }



    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}

export default App;
