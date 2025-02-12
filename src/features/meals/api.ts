import { baseApi } from '../../baseApi'
import { Meal } from './types'

const MEALS_API_ENDPOINT = '/meals'

const mealsApi = baseApi
    .enhanceEndpoints({addTagTypes: ['Meals', 'Recipes']})
    .injectEndpoints({
        endpoints: (builder) => ({
            fetchMeals: builder.query<{[key:string]: Meal}, void>({
                query: () => `${MEALS_API_ENDPOINT}`,
                providesTags: (result) => [
                    { type: 'All' as const},
                    { type: 'Meals' as const, id: 'LIST'},
                    ...(
                        result
                        ? Object.keys(result).map(id => ({ type : 'Meals' as const, id}))
                        : []
                    )
                ]
            }),
            getMealById: builder.query<Meal, string>({
                query: (id) => `${MEALS_API_ENDPOINT}/${id}`,
                providesTags: (_result, _error, arg) => [
                    { type : 'All' as const},
                    { type : 'Meals' as const, id: arg}
                ]
            }),
            createMeal: builder.mutation<Meal, Meal>({
                query: (data) => ({
                    url: `${MEALS_API_ENDPOINT}`,
                    method: 'POST',
                    body: { data }
                }),
                invalidatesTags:[
                    { type : 'Meals' as const, id: 'LIST'}
                ]
            }),
            deleteMeal: builder.mutation<void, string>({
                query: (id) => ({
                    url: `${MEALS_API_ENDPOINT}/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: [
                    { type : 'Meals' as const, id: 'LIST'}
                ]
            })
        })
    })

export const {
    useFetchMealsQuery,
    useCreateMealMutation,
    useDeleteMealMutation,
    useGetMealByIdQuery,
} = mealsApi