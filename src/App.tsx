import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: TaskType[]
}

function App(): JSX.Element {
    const todoListId_1 = v1();
    const todoListId_2 = v1();

    const [todoLists, setTodoLists] = useState<TodoListType[]>(
        [
            {id: todoListId_1, title: "What to learn", filter: "all"},
            {id: todoListId_2, title: "What to buy", filter: "all"},
        ]
    )
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Ice cream", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
        ],
    })


    const changeFilter = (nextFilterValue: FilterValuesType, todoListId: string) => {
        const updateTodoLists: TodoListType[] = todoLists.map(el => el.id === todoListId ? {
            ...el,
            filter: nextFilterValue
        } : el)
        setTodoLists(updateTodoLists)
    }
    const removeTask = (taskId: string, todoListId: string) => {
        // const tasksForTodoList: TaskType[] = tasks[todoListId];
        // const updatedTasks: TaskType[] = tasksForTodoList.filter((t) => t.id !== taskId);
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)

        setTasks({...tasks, [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId)})
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask,...tasks[todoListId]]})

    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoListId: string) => {

        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el=>el.id===taskId ? {...el, isDone: newIsDoneValue} : el)})

        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(el=>el.id!==todoListId));
        const copyTasks = {...tasks};
        delete tasks[todoListId];
        setTasks(copyTasks)
    }
    const getFilteredTasks =
        (allTasks: Array<TaskType>, currentFilterValue: FilterValuesType): Array<TaskType> => {
            switch (currentFilterValue) {
                case "completed":
                    return allTasks.filter(t => t.isDone)
                case "active":
                    return allTasks.filter(t => !t.isDone)
                default:
                    return allTasks
            }
        }
    const todoListsComponents: Array<JSX.Element> = todoLists.map(el=>{
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[el.id], el.filter)
        return(
            <TodoList
                key={el.id}
                todoLIstId={el.id}
                title={el.title}
                filter={el.filter}
                tasks={filteredTasks}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
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
