import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    classes: string
    changeTitle: (title:string)=>void
}
export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState('')

    const onEditMode = () => {
        setIsEditMode(true)
        setTitle(props.title)
    }
    const offEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title)
    }

    const changeItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
    }

    return (
        isEditMode
            ? <TextField variant="standard" size={'small'} autoFocus value={title} onBlur={offEditMode} onChange={changeItemTitle}/>
            : <span className={props.classes} onDoubleClick={onEditMode}>{props.title}</span>
    );
};