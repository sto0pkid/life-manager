
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Revenue {
    id: number
    name: string
    amount: number
    date: string
}

export interface RevenuesState {
    revenues: Revenue[]
}

const initialState: RevenuesState = {
    revenues: []
}
export const revenuesSlice = createSlice({
    name: 'revenues',
    initialState,
    reducers: {
        addRevenue: (state, action: PayloadAction<Revenue>) => {
            state.revenues.push(action.payload)
        },
        removeRevenue: (state, action: PayloadAction<number>) => {
            state.revenues = state.revenues.filter(revenue => revenue.id !== action.payload)
        }
    }
})

export const { addRevenue, removeRevenue } = revenuesSlice.actions
export default revenuesSlice.reducer