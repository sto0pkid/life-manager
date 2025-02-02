import { delay, http, HttpResponse } from 'msw'
import { Data } from '../../mocks/types'
import { JobLead } from './jobLeadsMockTypes'
import { uuidv4 } from '../../uuid'
import { isArray } from '../../lib/types'

export const jobLeadsHandlers = (data : Data) => [
    http.get('/api/jobLeads', async () => {
        await delay()
        return HttpResponse.json(data.jobLeads)
    }),
    http.post('/api/jobLeads', async (req) => {
        await delay()
        const { data: jobLead } = await req.request.json() as {data : JobLead }
        const id = uuidv4()
        data.jobLeads[id] = {
            ...jobLead,
            id
        }
        return HttpResponse.json(data.jobLeads[id])
    }),
    http.delete('/api/jobLeads/:id', async (req) => {
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
        if(!(id in data.jobLeads)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        delete data.jobLeads[id]
        return HttpResponse.json()
    })
]