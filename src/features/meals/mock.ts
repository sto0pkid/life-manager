import { delay, http, HttpResponse } from 'msw'
import { Data } from '../../mocks/types'
import { checkId } from '../../lib/types'
import { uuidv4 as newId } from '../../uuid'
import { MealInput } from './types'

export const mealsHandlers = (data : Data) => [
    http.get('/api/meals', async () => {
        await delay()
        return HttpResponse.json(data.meals)
    }),
    http.get('/api/meals/:id', async (req) => {
        await delay()
        const { id } = req.params
        if(!checkId(id, data.meals)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        return HttpResponse.json(data.meals[id])
    }),
    http.post('/api/meals', async (req) => {
        await delay()
        const { data : mealInput } = await req.request.json() as { data : MealInput }
        const id = newId()
        data.meals[id] = {
            ...mealInput,
            foods: {
                byIds: {},
                allIds: []
            },
            id: id
        }
        return HttpResponse.json(data.meals[id])
    }),
    http.delete('/api/meals/:id', async (req) => {
        await delay()
        const { id } = req.params
        if(!checkId(id, data.meals)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        delete data.meals[id]
        return HttpResponse.json()
    })
]