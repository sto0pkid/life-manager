import { Reminder } from './remindersTypes'
import { baseApi } from '../../baseApi'

const REMINDERS_API_PATH = '/reminders'

const remindersApi = baseApi
    .enhanceEndpoints({addTagTypes: ['Reminders']})
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllReminders: builder.query<{[key:string]: Reminder}, void>({
                query: () => `${REMINDERS_API_PATH}`,
                providesTags: (result) => [
                    { type : 'All' },
                    { type : 'Reminders', id : 'LIST' },
                    ...(
                        result
                        ? (
                            Object.keys(result).map(reminderId => ({ type : 'Reminders' , id: reminderId }))
                        ) : []
                    ) as { type : 'Reminders' , id : string }[]
                ]
            }),
            addReminder: builder.mutation<Reminder, Reminder>({
                query: (reminder) => ({
                    url: `${REMINDERS_API_PATH}`,
                    method: 'POST',
                    body: {data: reminder}
                }),
                invalidatesTags: [{type: 'Reminders', id: 'LIST'}]
            }),
            removeReminder: builder.mutation<void, string>({
                query: (id) => ({
                    url: `${REMINDERS_API_PATH}/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: (_result, _error, arg) => [
                    { type : 'Reminders', id : 'LIST' },
                    { type : 'Reminders', id : arg }
                ]
            })
        })
    })

export const {
    useGetAllRemindersQuery,
    useAddReminderMutation,
    useRemoveReminderMutation
} = remindersApi