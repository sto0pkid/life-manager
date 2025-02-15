import { baseApi } from '../../baseApi'
import { Triple } from '../../lib/types'

const GRAPH_API_ENDPOINT = '/graph'

const graphApi = baseApi
    .enhanceEndpoints({addTagTypes: ['Graph']})
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllEdges: builder.query<Triple[],void>({
                query: () => `${GRAPH_API_ENDPOINT}/all`,
                providesTags: () => [
                    { type : 'All' },
                    { type : 'Graph', id: 'LIST'}
                ]
            }),
            getEdges: builder.query<{in:Triple[],out:Triple[]}, string>({
                query: (id) => `${GRAPH_API_ENDPOINT}/get/${id}`,
                providesTags: (_result, _error, arg) => [
                    { type : 'All' },
                    { type : 'Graph', id : arg }  
                ]
            }),
            insertTriples: builder.mutation<void, Triple[]>({
                query: (triples) => ({
                    url: `${GRAPH_API_ENDPOINT}/add`,
                    method: 'POST',
                    body: { data : triples }
                }),
                invalidatesTags: (_result, _error, arg) => [
                    { type : 'Graph', id: 'LIST' },
                    ...arg.map(([s]) => ({ type : 'Graph' as const, id : s})),
                    ...arg.map(([_s,_p,o]) => ({ type : 'Graph' as const, id : o}))
                ]
            }),
            removeTriples: builder.mutation<void, Triple[]>({
                query: (triples) => ({
                    url: `${GRAPH_API_ENDPOINT}/remove`,
                    method: 'POST',
                    body: { data : triples }
                }),
                invalidatesTags: (_result, _error, arg) => [
                    { type : 'Graph', id: 'LIST' },
                    ...arg.map(([s]) => ({ type : 'Graph' as const, id : s})),
                    ...arg.map(([_s,_p,o]) => ({ type : 'Graph' as const, id : o}))
                ]
            })
        })
    })

export const {
    useGetAllEdgesQuery,
    useGetEdgesQuery,
    useInsertTriplesMutation,
    useRemoveTriplesMutation
} = graphApi