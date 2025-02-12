import { delay, http, HttpResponse } from 'msw'
import { Data } from '../../mocks/types'
import { checkId } from '../../lib/types'
import { uuidv4 as newId } from '../../uuid'
import { RecipeInput } from './types'

export const recipesHandlers = (data : Data) => [
    http.get('/api/recipes', async () => {
        await delay()
        return HttpResponse.json(data.recipes)
    }),
    http.get('/api/recipes/:id', async (req) => {
        await delay()
        const { id } = req.params
        if(!checkId(id, data.recipes)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        return HttpResponse.json(data.recipes[id])
    }),
    http.post('/api/recipes', async (req) => {
        await delay()
        const { data : recipeInput } = await req.request.json() as { data : RecipeInput }
        const id = newId()
        data.recipes[id] = {
            ...recipeInput,
            ingredients: {
                byIds: {},
                allIds: []
            },
            steps: [],
            id: id
        }
        return HttpResponse.json(data.recipes[id])
    }),
    http.delete('/api/recipes/:id', async (req) => {
        await delay()
        const { id } = req.params
        if(!checkId(id, data.recipes)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        delete data.recipes[id]
        return HttpResponse.json()
    })
]