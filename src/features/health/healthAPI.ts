import type { Health } from './healthTypes'
import { baseApi } from '../../baseApi'

const HEALTH_API_PATH = '/health'

const healthApi = baseApi
    .enhanceEndpoints({addTagTypes: ['Health']})
    .injectEndpoints({
        endpoints: (builder) => ({
            getHealthMetrics: builder.query<Health, void>({
                query: () => `${HEALTH_API_PATH}`,
                providesTags:  [
                    { type : 'All' },
                    { type : 'Health' }
                ]
            }),
            setHealthMetrics: builder.mutation<void, Partial<Health>>({
                query: (health) => ({
                    url: `${HEALTH_API_PATH}`,
                    method: 'PUT',
                    body: health,
                }),
                invalidatesTags: [{ type: 'Health' }],
            })
        })

    })

export const {
    useGetHealthMetricsQuery,
    useSetHealthMetricsMutation
} = healthApi