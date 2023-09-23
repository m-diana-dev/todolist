import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})
export const todolistAPI = {
    getTodolists() {
        return instance.get<TodoListType[]>('/todo-lists')
    },
    updateTodolist(todolistID: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistID}`, {title: title})
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistID}`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('/todo-lists', {title: title})
    },
    getTasks(todolistID: string) {
        return instance.get<GetTaskType>(`/todo-lists/${todolistID}/tasks`)
    },
    createTask(todolistID: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistID}/tasks`, {title: title})
    },
    updateTask(todolistID: string, taskID: string, title: string) {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistID}/tasks/${taskID}`, {title: title})
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`)
    }
}

type TodoListType = {
    addedDate: Date
    id: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

type GetTaskType = {
    error: string
    items: TaskType[],
    totalCount: number
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

