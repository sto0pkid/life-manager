import type { Revenue } from './revenueTypes'
import { baseApi } from '../../baseApi'

const REVENUES_API_PATH = '/revenues'

const revenuesApi = baseApi
    .enhanceEndpoints({addTagTypes: ['Revenues']})
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllRevenues: builder.query<{[key:string]: Revenue}, void>({
                query: () => `${REVENUES_API_PATH}`,
                providesTags: (result) => [
                    { type : 'All' },
                    { type : 'Revenues', id : 'LIST' },
                    ...(
                        result
                        ? (
                            Object.keys(result).map(revenueId => ({ type : 'Revenues', id : revenueId }))
                        ) : []
                    ) as { type : 'Revenues', id : string }[]
                ]
            }),
            getRevenueById: builder.query<Revenue, string>({
                query: (id) => `${REVENUES_API_PATH}/${id}`,
                providesTags: (_result, _error, arg) => [
                    { type: 'Revenues', id : arg }
                ]
            }),
            addRevenue: builder.mutation<Revenue, Partial<Revenue> & Pick<Revenue, 'id'>>({
                query: (revenue) => ({
                    url: `${REVENUES_API_PATH}`,
                    method: 'POST',
                    body: revenue,
                }),
                invalidatesTags: [{ type: 'Revenues', id: 'LIST' }],
            }),
            removeRevenue: builder.mutation<void, string>({
                query: (id) => ({
                    url: `${REVENUES_API_PATH}/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: (_result, _error, arg) => [
                    { type : 'Revenues', id : 'LIST' },
                    { type : 'Revenues', id : arg }
                ],
            })
        })
    })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllRevenuesQuery,
    useGetRevenueByIdQuery,
    useAddRevenueMutation,
    useRemoveRevenueMutation
} = revenuesApi