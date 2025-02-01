import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface JobLead {
    id: string;
    title: string;
    company: string;
    status: string;
}

const initialState : {
    [key:string]: JobLead
} = {}

export const jobLeadsSlice = createSlice({
    name: 'jobLeads',
    initialState,
    reducers: {
        addJobLead: (state, action : PayloadAction<JobLead>) => {
            state[action.payload.id] = action.payload
        },
        removeJobLead: (state, action : PayloadAction<string>) => {
            delete state[action.payload]
        }
    }
})

export const { addJobLead, removeJobLead } = jobLeadsSlice.actions
export default jobLeadsSlice.reducer