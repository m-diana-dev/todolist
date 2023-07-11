import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";
import {
    AddTodoListAC, ChangeTodoListFilterAC,
    ChangeTodoListFilterAT, ChangeTodoListTitleAC,
    ChangeTodoListTitleAT,
    RemoveTodoListAC,
    todolistsReducer
} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    //данные
    const todolistId1 = v1();
    const todolistId2 = v1();
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    //выполнения тестируемого кода
    // const endState =
    //     todolistsReducer(startState, {type: "REMOVE-TODOLIST", todoListId:todolistId1})
    const endState =
        todolistsReducer(startState, RemoveTodoListAC(todolistId1))
    //проверка результата на соответствие желаемому результату
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    //
    let todolistId1 = v1();
    let todolistId2 = v1();


    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    //
    // const endState =
    //     todolistsReducer(
    //         startState,
    //         {type: "ADD-TODOLIST", title: newTodolistTitle,
    //             todoListId: v1()})

    const endState =
        todolistsReducer(
            startState,AddTodoListAC(v1(), newTodolistTitle))

    //
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action: ChangeTodoListTitleAT = {type: "CHANGE-TODOLIST-TITLE" as const, title: newTodolistTitle,
        todoListId: todolistId2} //либо типизируем (ChangeTodoListTitleAT), либо as const
    // const endState = todolistsReducer(startState, action);
    const endState = todolistsReducer(startState, ChangeTodoListTitleAC(todolistId2, newTodolistTitle));


    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const action:ChangeTodoListFilterAT = {type: "CHANGE-TODOLIST-FILTER", filter: newFilter,
        todoListId: todolistId2}


    // const endState = todolistsReducer(startState, action);


    const endState = todolistsReducer(startState, ChangeTodoListFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});