import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Reminder } from './remindersTypes'

export const remindersApi = createApi({
    reducerPath: 'remindersApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api/reminders'}),
    tagTypes: ['Reminders'],
    endpoints: (builder) => ({
        getAllReminders: builder.query<{[key:string]: Reminder}, void>({
            query: () => ``,
            providesTags: [{type: 'Reminders', id: 'LIST'}]
        }),
        addReminder: builder.mutation<Reminder, Reminder>({
            query: (reminder) => ({
                url: ``,
                method: 'POST',
                body: {data: reminder}
            }),
            invalidatesTags: [{type: 'Reminders', id: 'LIST'}]
        }),
        removeReminder: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Reminders', id: 'LIST'}]
        })
    })
})

export const {
    useGetAllRemindersQuery,
    useAddReminderMutation,
    useRemoveReminderMutation
} = remindersApi