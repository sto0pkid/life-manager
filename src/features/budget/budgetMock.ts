import { delay, http, HttpResponse } from 'msw'
import { Data } from '../../mocks/types'
import { Budget } from './budgetMockTypes'


const budgetHandlers = (data : Data) => [
    http.get('/api/budget', async () => {
        await delay()
        return HttpResponse.json(data.budget)
    }),
    http.put('/api/budget/income', async (req) => {
        await delay()
        data.budget.income = await req.request.json() as Budget['income']
        return HttpResponse.json()
    }),
    http.put('/api/budget/expenses', async (req) => {
        await delay()
        data.budget.expenses = await req.request.json() as Budget['expenses']
        return HttpResponse.json()
    })
]

export { budgetHandlers }