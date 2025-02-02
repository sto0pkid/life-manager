import { delay, http, HttpResponse } from 'msw'
import { Data } from '../../mocks/types'
import { Activity } from './fitnessMockTypes'
import { uuidv4 } from '../../uuid'
import { isArray } from '../../lib/types'

const fitnessHandlers = (data: Data) => {
    return [
        http.get('/api/fitness', async () => {
            await delay()
            return HttpResponse.json(data.fitness)
        }),
        http.post('/api/fitness', async (req) => {
            await delay()
            const activity = await req.request.json() as Activity
            const id = uuidv4()

            data.fitness[id] = {
                ...activity,
                id
            }
            return HttpResponse.json()
        }),
        http.delete('/api/fitness/:id', async (req) => {
            await delay()
            const id = req.params.id
            if(typeof id === 'undefined'){
                return HttpResponse.json(null, {
                    status: 404
                })
            }
            if(isArray(id)){
                return HttpResponse.json(null, {
                    status: 404
                })
            }
            if(!(id in data.fitness)){
                return HttpResponse.json(null, {
                    status: 404
                })
            }
            delete data.fitness[id]
            return HttpResponse.json()
        })
    ]
}

export { fitnessHandlers }