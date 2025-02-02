import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { JobLead } from './jobLeadsTypes'

export const jobLeadsApi = createApi({
    reducerPath: 'jobLeadsApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api/jobLeads'}),
    tagTypes: ['JobLeads'],
    endpoints: (builder) => ({
        getAllJobLeads: builder.query<{[key:string]: JobLead},void>({
            query: () => ``,
            providesTags: [{type: 'JobLeads', id: 'LIST'}]
        }),
        addJobLead: builder.mutation<JobLead, JobLead>({
            query: (jobLead) => ({
                url: ``,
                method: 'POST',
                body: {data: jobLead}
            }),
            invalidatesTags: [{type: 'JobLeads', id: 'LIST'}]
        }),
        removeJobLead: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'JobLeads', id: 'LIST'}]
        })
    })
})

export const {
    useGetAllJobLeadsQuery,
    useAddJobLeadMutation,
    useRemoveJobLeadMutation
} = jobLeadsApi