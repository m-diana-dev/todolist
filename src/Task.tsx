import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";


type TaskPropsType = {
    id: string
    isDone: boolean
    title: string
    removeTask: (taskId: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void

}
export const Task = memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.id, newIsDoneValue);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.id, newValue);
    }, [props.changeTaskTitle, props.id])
    return (
        <div key={props.id} className={props.isDone ? "is-done" : ""}>
            <Checkbox
                checked={props.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={props.title} onChange={onTitleChangeHandler} />
            <IconButton onClick={onClickHandler}>
                <Delete />
            </IconButton>
        </div>
    );
});
