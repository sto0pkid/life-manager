import { JobLead } from './jobLeadsTypes'
import { baseApi } from '../../baseApi'

const JOB_LEADS_API_PATH = '/jobLeads'

const jobLeadsApi = baseApi
    .enhanceEndpoints({addTagTypes: ['JobLeads']})
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllJobLeads: builder.query<{[key:string]: JobLead},void>({
                query: () => `${JOB_LEADS_API_PATH}`,
                providesTags: (result) => [
                    { type : 'All' },
                    { type : 'JobLeads', id : 'LIST' },
                    ...(
                        result
                        ? (
                            Object.keys(result).map(jobLeadId => ({ type : 'JobLeads' , id : jobLeadId }))
                        ) : []
                    ) as { type : 'JobLeads' , id : string }[]
                ]
            }),
            addJobLead: builder.mutation<JobLead, JobLead>({
                query: (jobLead) => ({
                    url: `${JOB_LEADS_API_PATH}`,
                    method: 'POST',
                    body: {data: jobLead}
                }),
                invalidatesTags: [{type: 'JobLeads', id: 'LIST'}]
            }),
            removeJobLead: builder.mutation<void, string>({
                query: (id) => ({
                    url: `${JOB_LEADS_API_PATH}/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: (_result, _error, arg) => [
                    { type : 'JobLeads', id : 'LIST' },
                    { type : 'JobLeads', id : arg }
                ]
            })
        })
    })

export const {
    useGetAllJobLeadsQuery,
    useAddJobLeadMutation,
    useRemoveJobLeadMutation
} = jobLeadsApi