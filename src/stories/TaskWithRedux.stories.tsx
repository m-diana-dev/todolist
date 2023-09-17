import type {Meta, StoryObj} from '@storybook/react';

import {AddItemForm, AddItemFormPropsType} from "../AddItemForm/AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {action} from "@storybook/addon-actions"
import AppWithRedux from "../AppWithRedux/AppWithRedux";
import {Provider, useSelector} from "react-redux";
import {AppRootStateType, store} from "../state/store";
import {initialGlobalState, ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {TaskWithRedux} from "../TaskWithRedux";
import {TaskType} from "../Todolist";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLIST/TaskWithRedux',
    component: TaskWithRedux,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
    // args:{
    //     id: initialGlobalState.tasks['todolistId2'][1].id,
    //     isDone: initialGlobalState.tasks['todolistId2'][1].isDone,
    //     title: initialGlobalState.tasks['todolistId2'][1].title,
    //     todolistId: initialGlobalState.todolists[1].id
    // }
};

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const TaskWithReduxPresent = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId2'][1])
    if (!task) task = {id: '1', title: 'Default task', isDone: false}
    return <TaskWithRedux id={task.id} isDone={task.isDone} title={task.title} todolistId={'todolistId2'}/>
}
export const TaskWithReduxStory: Story = {
    render: () => <TaskWithReduxPresent/>
};

