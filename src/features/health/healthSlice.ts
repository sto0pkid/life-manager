import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export interface Health {
    weight: number;
    height: number;
    bloodPressure: string;
    heartRate: number;
}

const initialState : Health = {
    weight: 0,
    height: 0,
    bloodPressure: '',
    heartRate: 0
}

export const healthSlice = createSlice({
    name: 'health',
    initialState,
    reducers: {
        setHealthMetrics: (_state, action: PayloadAction<Health>) => {
            return action.payload
        }
    }
})

export const { setHealthMetrics } = healthSlice.actions

export default healthSlice.reducer