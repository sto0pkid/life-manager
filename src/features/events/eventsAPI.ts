import { Event } from './eventsTypes'
import { baseApi } from '../../baseApi'

const EVENTS_API_PATH = '/events'

const eventsApi = baseApi
    .enhanceEndpoints({addTagTypes: ['Events']})
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllEvents: builder.query<{[key:string]: Event}, void>({
                query: () => `${EVENTS_API_PATH}`,
                providesTags: (result) => [
                    { type : 'All' },
                    { type : 'Events', id : 'LIST'},
                    ...(
                        result
                        ? (
                            Object.keys(result).map((eventId : string) => ({ type : 'Events' , id : eventId }))
                        ) : []
                    ) as { type : 'Events' , id : string }[]
                ]
            }),
            addEvent: builder.mutation<void, Event>({
                query: (event) => ({
                    url: `${EVENTS_API_PATH}`,
                    method: 'POST',
                    body: {event}
                }),
                invalidatesTags: [{type: 'Events', id: 'LIST'}]
            }),
            removeEvent: builder.mutation<void, string>({
                query: (id) => ({
                    url: `${EVENTS_API_PATH}/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: (_result, _error, arg) => [
                    { type : 'Events', id : 'LIST' },
                    { type : 'Events', id : arg }
                ]
            })
        })
    })

export const {
    useGetAllEventsQuery,
    useAddEventMutation,
    useRemoveEventMutation
} = eventsApi