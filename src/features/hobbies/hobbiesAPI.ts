import { Hobby } from './hobbiesTypes'
import { baseApi } from '../../baseApi'

const HOBBIES_API_PATH = '/hobbies'

const hobbiesApi = baseApi
    .enhanceEndpoints({addTagTypes: ['Hobbies']})
    .injectEndpoints({
        endpoints: (builder) => ({
            getHobbies: builder.query<{[key:string]: Hobby}, void>({
                query: () => `${HOBBIES_API_PATH}`,
                providesTags: (result) => [
                    { type : 'All' },
                    { type : 'Hobbies', id : 'LIST' },
                    ...(
                        result
                        ? (
                            Object.keys(result).map(hobbyId => ({ type : 'Hobbies', id : hobbyId}))
                        ) : []
                    ) as { type : 'Hobbies' , id : string}[]
                ]
            }),
            addHobby: builder.mutation<void, Hobby>({
                query: (hobby) => ({
                    url: `${HOBBIES_API_PATH}`,
                    method: 'POST',
                    body: {hobby}
                }),
                invalidatesTags: [{type: 'Hobbies' , id : 'LIST'}]
            }),
            removeHobby: builder.mutation<void, string>({
                query: (id) => ({
                    url: `${HOBBIES_API_PATH}/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: (_result, _error, arg) => [
                    { type : 'Hobbies', id : 'LIST' },
                    { type : 'Hobbies', id : arg }
                ]
            })
        })
    })

export const {
    useGetHobbiesQuery,
    useAddHobbyMutation,
    useRemoveHobbyMutation
} = hobbiesApi

