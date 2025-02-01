import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState : string[] = []

export const hobbiesSlice = createSlice({
    name: 'hobbies',
    initialState,
    reducers: {
        addHobby: (state, action : PayloadAction<string>) => {
            state.push(action.payload)
        },
        removeHobby: (state, action : PayloadAction<string>) => {
            return state.filter(hobby => hobby !== action.payload)
        }
    }
})

export const { addHobby, removeHobby } = hobbiesSlice.actions
export default hobbiesSlice.reducer