import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [todoListId: string]: TaskType[]
}

function App() {
    const todoLidtId_1 = v1();
    const todoLidtId_2 = v1();

    const [todoLists, setTodoList] = useState<TodoListType[]>([
        {id: todoLidtId_1, title: "What to learn", filter: 'all'},
        {id: todoLidtId_2, title: "What to buy", filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoLidtId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoLidtId_2]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Cheeps", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Dry fish", isDone: false},
            {id: v1(), title: "Water", isDone: false},
        ]
    })

    //=============

    function removeTask(id: string, todoListId: string) {
        // const tasksArrayForDelete: TaskType[] = tasks[todoListId];
        // const tasksArrayAfterDelete: TaskType[] = tasksArrayForDelete.filter(t => t.id != id);
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = tasksArrayAfterDelete
        // setTasks(copyTasks)
        //=========
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id != id)})
    }

    function addTask(title: string, todoListId: string) {
        const newTask: TaskType = {id: v1(), title: title, isDone: false};
        // const tasksArrayAffterAdd: TaskType[] = [newTask, ...tasks[todoListId]]
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = tasksArrayAffterAdd;
        // setTasks(copyTasks);
        //===
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }

    function changeTaskTitle() {

    }

    function addTodoList() {

    }

    function changeTodoListFilter(value: FilterValuesType, todoListId: string) {
        setTodoList(todoLists.map(el => (el.id === todoListId) ? {...el, filter: value} : el))
    }

    function changeTodoListTitle(value: FilterValuesType, todoListId: string) {

    }

    function removeTodoList(todoListId: string) {
        setTodoList(todoLists.filter(el => el.id !== todoListId))
    }

    //==========


    const todoListsComponents: JSX.Element[] = todoLists.map(el => {
        let tasksForTodolist = tasks[el.id];

        if (el.filter === "active") {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
        }
        if (el.filter === "completed") {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
        }
        return (
            <Todolist
                key={el.id}
                todoListId={el.id}
                title={el.title}
                filter={el.filter}
                tasks={tasksForTodolist}

                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
            />
        )
    })

    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
