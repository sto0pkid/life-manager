// Need to use the React-specific entry point to import createApi
import type { Goal, GoalInput } from './types.ts'
import { baseApi } from '../../baseApi'

const GOALS_API_PATH = '/goals'


const goalsApi = baseApi
    .enhanceEndpoints({addTagTypes: ['Goals']})
    .injectEndpoints({
        endpoints: (builder) => ({
            fetchGoals: builder.query<{[key:string]: Goal},void>({
                query: () => `${GOALS_API_PATH}`,
                providesTags: [
                    { type : 'All' as const},
                    { type : 'Goals' as const, id: 'LIST'}
                ]
            }),
            getGoalById : builder.query<Goal, string>({
                query: (id) => `${GOALS_API_PATH}/${id}`,
                providesTags: (_result, _error, arg) => [
                    { type : 'All' as const},
                    { type : 'Goals' as const, id: arg}
                ]
            }),
            createGoal: builder.mutation<Goal, GoalInput>({
                query: (data) => ({
                    url: `${GOALS_API_PATH}`,
                    method: 'POST',
                    body: {data}
                }),
                invalidatesTags: [
                    { type : 'Goals' as const, id: 'LIST'}
                ]
            }),
            deleteGoal: builder.mutation<void, string>({
                query: (id) => ({
                    url: `${GOALS_API_PATH}/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: [
                    { type : 'Goals', id: 'LIST'}
                ]
            }),
            addGoalDependency: builder.mutation<string, {id: string, data: GoalInput}>({
                query: ({id, data}) => ({
                    url: `${GOALS_API_PATH}/${id}/dependencies`,
                    method: 'POST',
                    body: {data}
                }),
                invalidatesTags: (_result, _error, arg) => [
                    { type : 'Goals', id : 'LIST' },
                    { type : 'Goals', id : arg.id}
                ]
            }),
            deleteGoalDependency: builder.mutation<void,{goalId: string, dependencyId: string}>({
                query: ({goalId, dependencyId}) => ({
                    url: `${GOALS_API_PATH}/${goalId}/dependencies/${dependencyId}`,
                    method: 'DELETE'
                }),
                invalidatesTags: (_result, _error, arg) => [
                    { type : 'Goals', id: 'LIST'},
                    { type : 'Goals', id: arg.goalId}
                ]
            })
        })
    })

export const {
    useAddGoalDependencyMutation,
    useDeleteGoalDependencyMutation,
    useCreateGoalMutation,
    useDeleteGoalMutation,
    useGetGoalByIdQuery,
    useFetchGoalsQuery
} = goalsApi