import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Hobby } from './hobbiesTypes'

export const hobbiesApi = createApi({
    reducerPath: 'hobbiesApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api/hobbies'}),
    tagTypes: ['Hobbies'],
    endpoints: (builder) => ({
        getHobbies: builder.query<{[key:string]: Hobby}, void>({
            query: () => ({
                url: ``
            }),
            providesTags: [{type: 'Hobbies'}]
        }),
        addHobby: builder.mutation<void, Hobby>({
            query: (hobby) => ({
                url: ``,
                method: 'POST',
                body: {hobby}
            }),
            invalidatesTags: [{type: 'Hobbies'}]
        }),
        removeHobby: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Hobbies'}]
        })
    })
})

export const {
    useGetHobbiesQuery,
    useAddHobbyMutation,
    useRemoveHobbyMutation
} = hobbiesApi

