import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define the TS type for the counter slice's state
export interface BudgetState {
  income: number,
  expenses: number
}

// Define the initial value for the slice state
const initialState: BudgetState = {
  income: 0,
  expenses: 0
}

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setIncome: (state, action: PayloadAction<number>) => {
        state.income = action.payload
    },
    setExpenses: (state, action: PayloadAction<number>) => {
        state.expenses = action.payload
    }
  }
})

// Export the generated action creators for use in components
export const { setIncome, setExpenses } = budgetSlice.actions

// Export the slice reducer for use in the store configuration
export default budgetSlice.reducer