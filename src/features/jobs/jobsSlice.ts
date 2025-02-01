import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type JobApplication = {
    id: string;
    title: string;
    description: string;
    company: string;
    status: string;
    location: string;
    datePosted: Date | undefined;
}

export interface JobsState {
    [key:string]: JobApplication
}

const initialState: JobsState = {}

export const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        addJob: (state, action: PayloadAction<JobApplication>) => {
            state[action.payload.id] = action.payload
        },
        removeJob: (state, action: PayloadAction<string>) => {
            delete state[action.payload]
        }
    }
})

export type { JobApplication}

export const { addJob, removeJob } = jobsSlice.actions
export default jobsSlice.reducer