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
