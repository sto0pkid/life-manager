import { http, HttpResponse } from 'msw'
import sampleData from './data.json'
import { billsHandlers } from '../features/bills/billsMock';
import { budgetHandlers } from '../features/budget/budgetMock'
import { revenuesHandlers } from '../features/revenues/revenuesMock'
import { healthHandlers } from '../features/health/healthMock'
import { Data } from './types'

const data : Data = sampleData as Data


export const handlers = [
    ...billsHandlers(data),
    ...budgetHandlers(data),
    ...revenuesHandlers(data),
    ...healthHandlers(data),
    // Catch-all route for any unhandled requests
    http.all('/api/*', () => {
        return new HttpResponse(null, {
            status: 404
        })
    })
]