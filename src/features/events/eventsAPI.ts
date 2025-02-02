import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Event } from './eventsTypes'

export const eventsApi = createApi({
    reducerPath: 'eventsApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api/events' }),
    tagTypes: ['Events'],
    endpoints: (builder) => ({
        getAllEvents: builder.query<{[key:string]: Event}, void>({
            query: () => ``,
            providesTags: [{type: 'Events', id: 'LIST'}]
        }),
        addEvent: builder.mutation<void, Event>({
            query: (event) => ({
                url: ``,
                method: 'POST',
                body: {event}
            }),
            invalidatesTags: [{type: 'Events', id: 'LIST'}]
        }),
        removeEvent: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Events', id: 'LIST'}]
        })
    })
})

export const {
    useGetAllEventsQuery,
    useAddEventMutation,
    useRemoveEventMutation
} = eventsApi