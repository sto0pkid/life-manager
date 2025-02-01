import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState : string[] = []

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addEvent: (state, action : PayloadAction<string>) => {
            state.push(action.payload)
        },
        removeEvent: (state, action : PayloadAction<string>) => {
            return state.filter(event => event !== action.payload)
        }
    }
})

export const { addEvent, removeEvent } = eventsSlice.actions
export default eventsSlice.reducer