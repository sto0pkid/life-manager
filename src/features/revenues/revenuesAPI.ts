import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Revenue } from './revenueTypes'


// Define a service using a base URL and expected endpoints
export const revenuesApi = createApi({
    reducerPath: 'revenuesApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/revenues' }),
    tagTypes: ['Revenues'],
    endpoints: (builder) => ({
        getAllRevenues: builder.query<{[key:string]: Revenue}, void>({
            query: () => ``,
            providesTags: (result) =>
                result
                ? [{ type: 'Revenues', id: 'LIST' }] 
                : [],
        }),
        getRevenueById: builder.query<Revenue, string>({
            query: (id) => `/${id}`,
            providesTags: (result) =>
                result
                ? [{ type: 'Revenues', id: result.id }] 
                : [],
        }),
        addRevenue: builder.mutation<Revenue, Partial<Revenue> & Pick<Revenue, 'id'>>({
            query: (revenue) => ({
                url: ``,
                method: 'POST',
                body: revenue,
            }),
            invalidatesTags: [{ type: 'Revenues', id: 'LIST' }],
        }),
        removeRevenue: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Revenues', id: 'LIST' }],
        })
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllRevenuesQuery,
    useGetRevenueByIdQuery,
    useAddRevenueMutation,
    useRemoveRevenueMutation
} = revenuesApi