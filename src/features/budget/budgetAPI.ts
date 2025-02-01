// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Budget } from './budgetTypes'

// Define a service using a base URL and expected endpoints
export const budgetApi = createApi({
    reducerPath: 'budgetApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/budget' }),
    tagTypes: ['Budget'],
    endpoints: (builder) => ({
        getBudget: builder.query<Budget, void>({
            query: () => ``,
            providesTags: (result) =>
                result
                ? [{ type: 'Budget' }] 
                : [],
        }),
        setBudget: builder.mutation<void, Partial<Budget>>({
            query: (budget) => ({
                url: ``,
                method: 'PUT',
                body: budget,
            }),
            invalidatesTags: [{ type: 'Budget' }],
        }),
        setIncome: builder.mutation<void, number>({
            // note: an optional `queryFn` may be used in place of `query`
            query: (income) => ({
                url: `/income`,
                method: 'PUT',
                body: {income},
            }),
            invalidatesTags: [{ type: 'Budget' }],
        }),
        setExpenses: builder.mutation<void, number>({
            query: (expenses) => ({
                url: `/expenses`,
                method: 'PUT',
                body: {expenses}
            }),
            invalidatesTags: [{ type: 'Budget' }],
        })
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetBudgetQuery,
    useSetIncomeMutation,
    useSetExpensesMutation,
    useSetBudgetMutation
} = budgetApi