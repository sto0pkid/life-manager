import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from './baseApi'

// to make sure all the API extensions get applied to the base API
import {} from './features/budget/budgetAPI'
import {} from './features/bills/billsAPI'
import {} from './features/revenues/revenuesAPI'
import {} from './features/health/healthAPI'
import {} from './features/fitness/fitnessAPI'
import {} from './features/hobbies/hobbiesAPI'
import {} from './features/events/eventsAPI'
import {} from './features/reminders/remindersAPI'
import {} from './features/jobLeads/jobLeadsAPI'
import {} from './features/jobs/jobsAPI'
import {} from './features/planning/api'
import {} from './features/graph/api'

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware)
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