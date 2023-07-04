import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar, Checkbox,
    Container,
    createTheme,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {amber, deepPurple} from "@mui/material/colors";

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

    const [isLightMode, setIsLightMode] = useState(true)


    const changeFilter = (nextFilterValue: FilterValuesType, todoListId: string) => {
        const updateTodoLists: TodoListType[] = todoLists.map(el => el.id === todoListId ? {
            ...el,
            filter: nextFilterValue
        } : el)
        setTodoLists(updateTodoLists)
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        const updateTodoLists: TodoListType[] = todoLists.map(el => el.id === todoListId ? {
            ...el,
            title
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
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})

    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoListId: string) => {

        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, isDone: newIsDoneValue} : el)
        })

    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todoListId));
        const copyTasks = {...tasks};
        delete tasks[todoListId];
        setTasks(copyTasks)
    }
    const addTodoList = (title: string) => {
        const newTodoId = v1();
        const newTodo: TodoListType = {id: newTodoId, title, filter: 'all'}
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks, [newTodoId]: []})
    }

    const maxTodoListTitleLength = 15;
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
    const todoListsComponents: Array<JSX.Element> = todoLists.map(el => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[el.id], el.filter)
        return (
            <Grid item key={el.id}>
                <Paper elevation={4}>
                    <TodoList
                        todoLIstId={el.id}
                        title={el.title}
                        filter={el.filter}
                        tasks={filteredTasks}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })
const mode = isLightMode ? 'light' : 'dark'
const customTheme = createTheme({
        palette: {
            primary: deepPurple,
                secondary: amber,
            mode: mode
        },
})
    return (
        <ThemeProvider theme={customTheme}>
            <div className="App">
                <AppBar position={'sticky'}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            TodoLists
                        </Typography>
                        <Button color={"inherit"} variant={"outlined"} onClick={()=>setIsLightMode(!isLightMode)}>
                            {isLightMode?'set dark':'set light'}
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid container sx={{p: "15px 0"}}>
                        <Paper elevation={4}>
                            <div className={"add-form"}>
                                <AddItemForm maxItemTitleLength={maxTodoListTitleLength} addItem={addTodoList}/>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid container spacing={2}>
                        {todoListsComponents}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    )
}

export default App;
