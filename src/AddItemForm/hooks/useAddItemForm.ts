import {ChangeEvent, KeyboardEvent, useState} from "react";

export function useAddItemForm(onAddedItem: (title: string) => void){
    console.log('AddItemForm')
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            onAddedItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return {
        title,
        error,
        onChangeHandler,
        onKeyPressHandler,
        addItem
    }
}