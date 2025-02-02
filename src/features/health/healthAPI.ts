import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Health } from './healthTypes'

export const healthApi = createApi({
    reducerPath: 'healthApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/health' }),
    tagTypes: ['Health'],
    endpoints: (builder) => ({
        getHealthMetrics: builder.query<Health, void>({
            query: () => ``,
            providesTags: (result) =>
                result
                ? [{ type: 'Health' }] 
                : [],
        }),
        setHealthMetrics: builder.mutation<void, Partial<Health>>({
            query: (health) => ({
                url: ``,
                method: 'PUT',
                body: health,
            }),
            invalidatesTags: [{ type: 'Health' }],
        })
    })

})

export const {
    useGetHealthMetricsQuery,
    useSetHealthMetricsMutation
} = healthApi