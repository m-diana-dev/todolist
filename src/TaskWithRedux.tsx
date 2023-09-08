import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";


type TaskPropsType = {
    id: string
    isDone: boolean
    title: string
    todolistId: string

}
export const TaskWithRedux = memo((props: TaskPropsType) => {
    console.log('TaskWithRedux')
    const dispatch = useDispatch();
    const onClickHandler = () => dispatch(removeTaskAC(props.id, props.todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.id, newIsDoneValue, props.todolistId))
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.id, newValue, props.todolistId))
    }, [dispatch])
    return (
        <div key={props.id} className={props.isDone ? "is-done" : ""}>
            <Checkbox
                checked={props.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={props.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});
