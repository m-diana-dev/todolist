import React, {ChangeEvent, useState} from 'react';

export type EditableSpanPropsType = {
    title: string
    callback: (title:string)=>void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const[edit,setEdit]=useState(false);
    const onHandler = () => {
        setEdit(!edit)
        if(edit){
            addTaskHandler();
        }
    }

    let [title, setTitle] = useState(props.title)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        props.callback(title);
    }

    return (
        edit
            ? <input onChange={onChangeHandler} onBlur={onHandler} value={title} autoFocus/>
            : <span onDoubleClick={onHandler}>{props.title}</span>

    );
};
