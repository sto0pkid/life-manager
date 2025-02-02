import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { budgetApi } from './features/budget/budgetAPI'
import { billsApi } from './features/bills/billsAPI'
import { revenuesApi } from './features/revenues/revenuesAPI'
import { healthApi } from './features/health/healthAPI'
import { fitnessApi } from './features/fitness/fitnessAPI'
import { hobbiesApi } from './features/hobbies/hobbiesAPI'
import { eventsApi } from './features/events/eventsAPI'
import { remindersApi } from './features/reminders/remindersAPI'
//import remindersReducer from './features/reminders/remindersSlice'
import jobsReducer from './features/jobs/jobsSlice'
import jobLeadsReducer from './features/jobLeads/jobLeadsSlice'

const store = configureStore({
  reducer: {
    [budgetApi.reducerPath]: budgetApi.reducer,
    [billsApi.reducerPath]: billsApi.reducer,
    [revenuesApi.reducerPath]: revenuesApi.reducer,
    [healthApi.reducerPath]: healthApi.reducer,
    [fitnessApi.reducerPath]: fitnessApi.reducer,
    [hobbiesApi.reducerPath]: hobbiesApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [remindersApi.reducerPath]: remindersApi.reducer,
    //reminders: remindersReducer,
    jobs: jobsReducer,
    jobLeads: jobLeadsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      billsApi.middleware,
      budgetApi.middleware,
      revenuesApi.middleware,
      healthApi.middleware,
      fitnessApi.middleware,
      hobbiesApi.middleware,
      eventsApi.middleware,
      remindersApi.middleware
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