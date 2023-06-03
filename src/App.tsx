import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    id: string
    title:string
    filter:FilterValuesType
}
export type TaskAssocType = {
    [key: string]:TaskType[]
}

function App() {
    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to bye", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TaskAssocType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Orange', isDone: true},
            {id: v1(), title: 'Apple', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
        ]
    })


    function removeTask(taskId: string, todoListId:string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(el=>el.id!==taskId)})
    }

    function addTask(title: string, todoListId:string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListId]:[...tasks[todoListId],task]})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        setTasks({...tasks, [todoListId]:tasks[todoListId].map(el=>el.id===taskId ? {...el, isDone} : el)})
    }



    function changeFilter(value: FilterValuesType, idTodolist:string) {
        setTodoLists(todoLists.map(el=>(el.id === idTodolist) ? {...el, filter:value} : el))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(el=>el.id!==todoListId))
        delete tasks[todoListId];
    }

    const addTodoList = (title:string) => {
        const todoListId3 =v1();
        setTodoLists([{id: todoListId3, title: title, filter: "all"}, ...todoLists])
        setTasks({[todoListId3]:[], ...tasks})
    }

    const updateTask = (todoListId: string, taskId:string, title:string) => {
        setTasks({...tasks, [todoListId]:tasks[todoListId].map(el=>el.id===taskId ? {...el, title: title} : el)})
    }

    const updateTodoListTitle = (todoListId: string, title:string) => {
        setTodoLists(todoLists.map(el=>el.id===todoListId ? {...el, title} : el))
    }


    return (
        <div className="App">
            <AddItemForm callback={addTodoList}/>
            {
                todoLists.map(el=>{

                    let tasksForTodolist = tasks[el.id];

                    if (el.filter === "active") {
                        tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                    }
                    if (el.filter === "completed") {
                        tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                    }
                    return(
                        <Todolist key={el.id}
                            title={el.title}
                                  id={el.id}
                                  tasks={tasksForTodolist}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeStatus}
                                  filter={el.filter}
                                  removeTodoList={removeTodoList}
                                  updateTask={updateTask}
                                  updateTodoListTitle={(title:string)=>updateTodoListTitle(el.id,title)}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
