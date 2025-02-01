import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface Activity {
   name: string;
}

export interface FitnessState {
    activities: Activity[]
}

const initialState: FitnessState = {
    activities: []
}

export const fitnessSlice = createSlice({
    name: 'fitness',
    initialState,
    reducers: {
        addActivity: (state, action: PayloadAction<Activity>) => {
            state.activities.push(action.payload)
        }
    }
})

export const { addActivity } = fitnessSlice.actions

export default fitnessSlice.reducer