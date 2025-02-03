import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { JobApplication } from './jobsTypes'

export const jobsApi = createApi({
    reducerPath: 'jobsApi',
    baseQuery: fetchBaseQuery({ baseUrl : '/api/jobs' }),
    tagTypes: ['Jobs'],
    endpoints: (builder) => ({
        getAllJobs: builder.query<{[key:string] : JobApplication}, void>({
            query: () => ``,
            providesTags: [{type: 'Jobs', id: 'LIST'}]
        }),
        addJob: builder.mutation<JobApplication, JobApplication>({
            query: (job) => ({
                url: ``,
                method: 'POST',
                body: { data : job }
            }),
            invalidatesTags: [{type: 'Jobs', id: 'LIST'}]
        }),
        removeJob: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Jobs', id: 'LIST'}]
        })
    })
})

export const {
    useGetAllJobsQuery,
    useAddJobMutation,
    useRemoveJobMutation
} = jobsApi