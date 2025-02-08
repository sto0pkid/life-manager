// Need to use the React-specific entry point to import createApi
import type { Bill } from './billsTypes.ts'
import { baseApi } from '../../baseApi'

const BILLS_API_PATH = '/bills'


const billsApi = baseApi
    .enhanceEndpoints({addTagTypes: ['Bills']})
    .injectEndpoints({
        endpoints: (builder) => ({
            getBillById: builder.query<Bill, string>({
                query: (id) => `${BILLS_API_PATH}/${id}`,
                providesTags: (result) =>
                    [
                        { type : 'All'},
                        ...(
                            result
                            ? [{ type: 'Bills', id: result.id }] 
                            : []
                        ) as { type : 'All' | 'Bills', id: string}[]
                    ]
            }),
            getAllBills: builder.query<{[key:string]: Bill}, void>({
                query: () => `${BILLS_API_PATH}`,
                providesTags: (result) =>
                    [
                        { type : 'All' },
                        { type : 'Bills', id : 'LIST' },
                        ...(
                            result
                            ? (
                                Object.keys(result).map(key => ({ type: 'Bills' as const, id: key }))
                            ) : []
                        )
                    ]
            }),
            addBill: builder.mutation<Bill, Partial<Bill> & Pick<Bill, 'id'>>({
                // note: an optional `queryFn` may be used in place of `query`
                query: (bill) => ({
                    url: `${BILLS_API_PATH}`,
                    method: 'POST',
                    body: bill,
                }),
                invalidatesTags: [{ type: 'Bills', id: 'LIST' }],
            }),
            removeBill: builder.mutation<void, string>({
                query: (id) => ({
                    url: `${BILLS_API_PATH}/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: (_result, _error, arg) => [
                    { type : 'Bills', id : 'LIST' },
                    { type : 'Bills', id: arg }
                ],
            })
        })
    })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetBillByIdQuery,
    useGetAllBillsQuery,
    useAddBillMutation,
    useRemoveBillMutation
} = billsApi