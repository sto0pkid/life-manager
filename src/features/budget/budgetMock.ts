import { delay, http, HttpResponse } from 'msw'
import { Data } from '../../mocks/types'
import { Budget } from './budgetMockTypes'


const budgetHandlers = (data : Data) => [
    http.get('/api/budget', async () => {
        await delay()
        return HttpResponse.json(data.budget)
    }),
    http.put('/api/budget', async (req) => {
        await delay()
        data.budget = await req.request.json() as Budget
        return HttpResponse.json()
    })
]

export { budgetHandlers }