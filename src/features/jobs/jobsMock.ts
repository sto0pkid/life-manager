import { delay, http, HttpResponse } from 'msw'
import { Data } from '../../mocks/types'
import { JobApplication } from './jobsTypes'
import { isArray } from '../../lib/types'
import { uuidv4 } from '../../uuid'

export const jobsHandlers = (data : Data) => [
    http.get('/api/jobs', async () => {
        await delay()
        return HttpResponse.json(data.jobs)
    }),
    http.post('/api/jobs', async (req) => {
        await delay()
        const id = uuidv4()
        const { data : job } = await req.request.json() as { data : JobApplication } 
        data.jobs[id] = {
            ...job,
            id
        }
        return HttpResponse.json(data.jobs[id])
    }),
    http.delete('/api/jobs/:id', async (req) => {
        await delay()
        const { id } = req.params
        if(!id){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        if(isArray(id)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        if(!(id in data.jobs)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        return HttpResponse.json()
    })
]