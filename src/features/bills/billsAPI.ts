// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Bill } from './billsTypes.ts'

// Define a service using a base URL and expected endpoints
export const billsApi = createApi({
    reducerPath: 'billsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/bills' }),
    tagTypes: ['Bills'],
    endpoints: (builder) => ({
        getBillById: builder.query<Bill, string>({
            query: (id) => `/${id}`,
            providesTags: (result) =>
                result
                ? [{ type: 'Bills', id: result.id }] 
                : [],
        }),
        getAllBills: builder.query<{[key:string]: Bill}, void>({
            query: () => `/`,
            providesTags: (result) =>
                result
                  ? [
                      ...(
                        Object.keys(result).map(key => ({ type: 'Bills' as const, id: key }))
                      ),
                      { type: 'Bills', id: 'LIST' },
                    ]
                  : [{ type: 'Bills', id: 'LIST' }],
        }),
        addBill: builder.mutation<Bill, Partial<Bill> & Pick<Bill, 'id'>>({
            // note: an optional `queryFn` may be used in place of `query`
            query: (bill) => ({
                url: ``,
                method: 'POST',
                body: bill,
            }),
            invalidatesTags: [{ type: 'Bills', id: 'LIST' }],
        }),
        removeBill: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Bills', id: 'LIST' }],
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