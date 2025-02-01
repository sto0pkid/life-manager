import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
//import budgetReducer from './features/budget/budgetSlice'
import { budgetApi } from './features/budget/budgetAPI'
import { billsApi } from './features/bills/billsAPI'
import revenuesReducer from './features/revenues/revenuesSlice'
import healthReducer from './features/health/healthSlice'
import fitnessReducer from './features/fitness/fitnessSlice'
import hobbiesReducer from './features/hobbies/hobbiesSlice'
import eventsReducer from './features/events/eventsSlice'
import remindersReducer from './features/reminders/remindersSlice'
import jobsReducer from './features/jobs/jobsSlice'
import jobLeadsReducer from './features/jobLeads/jobLeadsSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    [budgetApi.reducerPath]: budgetApi.reducer,
    [billsApi.reducerPath]: billsApi.reducer,
    revenues: revenuesReducer,
    health: healthReducer,
    fitness: fitnessReducer,
    hobbies: hobbiesReducer,
    events: eventsReducer,
    reminders: remindersReducer,
    jobs: jobsReducer,
    jobLeads: jobLeadsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      billsApi.middleware,
      budgetApi.middleware
    )
})

export default store

// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>