import { delay, http, HttpResponse } from 'msw'
import { Data } from '../../mocks/types'
import { checkId } from '@/lib/types'
import { uuidv4 as newId } from '../../uuid'
import { GoalInput } from './types'

export const goalsHandlers = (data : Data ) => [
    http.get('/api/goals', async () => {
        await delay()
        return HttpResponse.json(data.goals)
    }),
    http.get('/api/goals/:id', async (req) => {
        await delay()
        const { id } = req.params
        if(!checkId(id, data.goals)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        return HttpResponse.json(data.goals[id])
    }),
    http.post('/api/goals', async (req) => {
        await delay()
        const { data : goalInput } = await req.request.json() as { data : GoalInput }
        const id = newId()
        data.goals[id] = {
            ...goalInput,
            dependsOn: [],
            id
        }
        return HttpResponse.json(data.goals[id])
    }),
    http.delete('/api/goals/:id', async (req) => {
        await delay()
        const { id } = req.params
        if(!checkId(id, data.goals)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        delete data.goals[id]
        return HttpResponse.json()
    }),
    http.post('/api/goals/:id/dependencies', async (req) => {
        await delay()
        const { id } = req.params
        if(!checkId(id, data.goals)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        const { data : dependencyInput } = await req.request.json() as { data : {name: string}}
        const dependencyId = newId()
        data.goals[id].dependsOn.push({
            ...dependencyInput,
            id: dependencyId
        })
        return HttpResponse.json({data: dependencyId})
        
    }),
    http.delete('/api/goals/:id/dependencies/:dependencyId', async (req) => {
        await delay()
        const {id, dependencyId} = req.params
        if(!checkId(id, data.goals)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        if(!data.goals[id].dependsOn.find((value) => value.id === dependencyId)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        data.goals[id].dependsOn = data.goals[id].dependsOn.filter((value) => value.id !== dependencyId)
        return HttpResponse.json()
    })
]