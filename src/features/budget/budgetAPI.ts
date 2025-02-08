import type { Budget } from './budgetTypes'
import { baseApi } from '../../baseApi'

const BUDGET_API_PATH = '/budget'

const budgetApi = baseApi
    .enhanceEndpoints({addTagTypes: ['Budget']})
    .injectEndpoints({
        endpoints: (builder) => ({
            getBudget: builder.query<Budget, void>({
                query: () => `${BUDGET_API_PATH}`,
                providesTags: [
                    { type : 'All' },
                    { type : 'Budget' }
                ]
                    
            }),
            setBudget: builder.mutation<void, Partial<Budget>>({
                query: (budget) => ({
                    url: `${BUDGET_API_PATH}`,
                    method: 'PUT',
                    body: budget,
                }),
                invalidatesTags: [{ type: 'Budget' }],
            })
        })
    })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetBudgetQuery,
    useSetBudgetMutation
} = budgetApi