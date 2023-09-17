import type {Meta, StoryObj} from '@storybook/react';

import {AddItemForm, AddItemFormPropsType} from "../AddItemForm/AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {action} from "@storybook/addon-actions"
import {Task} from "../Task";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    args: {
        id: '2',
        isDone: false,
        title: 'React',
        removeTask: action('removeTask'),
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const TaskIsDoneStory: Story = {
    args: {
        isDone: true,
    }
};

export const TaskIsNotDoneStory: Story = {};
export const TaskPresentation = () => {
    const [taskStatus, setTaskStatus] = useState(false)
    const [taskTitle, setTaskTitle] = useState('CSS')
    return <Task id={'1'}
                 isDone={taskStatus}
                 title={taskTitle}
                 removeTask={action('Remove task')}
                 changeTaskStatus={() => setTaskStatus(!taskStatus)}
                 changeTaskTitle={(_, newTitle) => setTaskTitle(newTitle)}/>
}
