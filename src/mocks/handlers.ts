import { http, HttpResponse } from 'msw'
import sampleData from './data.json'
import { billsHandlers } from '../features/bills/billsMock';
import { budgetHandlers } from '../features/budget/budgetMock'
import { Data } from './types'

const data : Data = sampleData as Data


export const handlers = [
    ...billsHandlers(data),
    ...budgetHandlers(data),
    // Catch-all route for any unhandled requests
    http.all('/api/*', () => {
        return new HttpResponse(null, {
            status: 404
        })
    })
]