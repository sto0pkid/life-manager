import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Bill } from './billsTypes'

// Define the TS type for the counter slice's state
export interface BillsState {
  bills: Bill[]
}

// Define the initial value for the slice state
const initialState: BillsState = {
  bills: []
}

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const billsSlice = createSlice({
  name: 'bills',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addBill: (state, action: PayloadAction<Bill>) => {
        state.bills.push(action.payload)
    },
    removeBill: (state, action: PayloadAction<string>) => {
        state.bills = state.bills.filter(bill => bill.id !== action.payload)
    }
  }
})

// Export the generated action creators for use in components
export const { addBill, removeBill } = billsSlice.actions

// Export the slice reducer for use in the store configuration
export default billsSlice.reducer