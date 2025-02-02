import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { Activity } from './fitnessTypes'

// Define a service using a base URL and expected endpoints
export const fitnessApi = createApi({
    reducerPath: 'fitnessApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/fitness' }),
    tagTypes: ['Fitness'],
    endpoints: (builder) => ({
        getActivities: builder.query<{[key:string]: Activity}, void>({
            query: () => ``,
            providesTags: (result) =>
                result
                ? [{ type: 'Fitness' }] 
                : [],
        }),
        addActivity: builder.mutation<void, Activity>({
            query: (activity) => ({
                url: ``,
                method: 'POST',
                body: activity,
            }),
            invalidatesTags: [{ type: 'Fitness' }],
        }),
        removeActivity: builder.mutation<void, string>({
            query: (id : string) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Fitness'}]
        })
    })
})

export const {
    useGetActivitiesQuery,
    useAddActivityMutation,
    useRemoveActivityMutation
} = fitnessApi