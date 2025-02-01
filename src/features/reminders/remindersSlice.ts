import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState : string[] = []

export const remindersSlice = createSlice({
    name: 'reminders',
    initialState,
    reducers: {
        addReminder: (state, action : PayloadAction<string>) => {
            state.push(action.payload)
        },
        removeReminder: (state, action : PayloadAction<string>) => {
            return state.filter(hobby => hobby !== action.payload)
        }
    }
})

export const { addReminder, removeReminder } = remindersSlice.actions
export default remindersSlice.reducer