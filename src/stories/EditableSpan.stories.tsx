import type {Meta, StoryObj} from '@storybook/react';

import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {action} from "@storybook/addon-actions"
import {EditableSpan} from "../EditableSpan";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        onChange: {
            action: 'clicked',
            description: 'value EditableSpan changed'
        },
        value: {
            description: 'start value EditableSpan'
        }
    },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const EditableSpanStory: Story = {
    args: {
        value: 'HTML'
    }};


