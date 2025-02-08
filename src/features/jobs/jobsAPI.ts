import { JobApplication } from './jobsTypes'
import { baseApi } from '../../baseApi'

const JOBS_API_PATH = '/jobs'

const jobsApi = baseApi
    .enhanceEndpoints({addTagTypes: ['Jobs']})
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllJobs: builder.query<{[key:string] : JobApplication}, void>({
                query: () => `${JOBS_API_PATH}`,
                providesTags: (result) => [
                    { type : 'All' },
                    { type : 'Jobs', id : 'LIST' },
                    ...(
                        result
                        ? (
                            Object.keys(result).map(jobId => ({ type : 'Jobs', id : jobId }))
                        ) : []
                    ) as { type : 'Jobs' , id : string}[]
                ]
            }),
            addJob: builder.mutation<JobApplication, JobApplication>({
                query: (job) => ({
                    url: `${JOBS_API_PATH}`,
                    method: 'POST',
                    body: { data : job }
                }),
                invalidatesTags: [{type: 'Jobs', id: 'LIST'}]
            }),
            removeJob: builder.mutation<void, string>({
                query: (id) => ({
                    url: `${JOBS_API_PATH}/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: (_result, _error, arg) => [
                    { type : 'Jobs', id : 'LIST' },
                    { type : 'Jobs', id : arg }
                ]
            })
        })
    })

export const {
    useGetAllJobsQuery,
    useAddJobMutation,
    useRemoveJobMutation
} = jobsApi