import { Activity } from './fitnessTypes'
import { baseApi } from '../../baseApi'

const FITNESS_API_PATH = '/fitness'

const fitnessApi = baseApi
    .enhanceEndpoints({addTagTypes: ['Fitness']})
    .injectEndpoints({
        endpoints: (builder) => ({
            getActivities: builder.query<{[key:string]: Activity}, void>({
                query: () => `${FITNESS_API_PATH}`,
                providesTags: [
                    { type : 'All' },
                    { type : 'Fitness', id : 'LIST' }
                ],
            }),
            addActivity: builder.mutation<void, Activity>({
                query: (activity) => ({
                    url: `${FITNESS_API_PATH}`,
                    method: 'POST',
                    body: activity,
                }),
                invalidatesTags: [{ type: 'Fitness', id : 'LIST'}],
            }),
            removeActivity: builder.mutation<void, string>({
                query: (id : string) => ({
                    url: `${FITNESS_API_PATH}/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: (_result, _error, arg) => [
                    { type : 'Fitness', id : 'LIST' },
                    { type : 'Fitness', id : arg }
                ]
            })
        })
    })

export const {
    useGetActivitiesQuery,
    useAddActivityMutation,
    useRemoveActivityMutation
} = fitnessApi