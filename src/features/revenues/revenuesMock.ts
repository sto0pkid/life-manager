import { delay, http, HttpResponse } from 'msw'
import { uuidv4 } from '../../uuid';
import { Data } from '../../mocks/types'
import { isArray } from '../../lib/types'
import { Revenue } from './revenuesMockTypes'


const revenuesHandlers = (data : Data) => [
    http.get('/api/revenues', async () => {
        await delay()
        return HttpResponse.json(data.revenues)
    }),
    http.get('/api/revenues/:id', async (req) => {
        await delay()
        const { params } = req
        const { id } = params
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
        if(!(id in data.revenues)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        const revenue = data.revenues[id]
        return HttpResponse.json(revenue)
    }),
    http.put('/api/revenues/:id', async (req) => {
        await delay()
        const { params, request } = req
        const { id } = params
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
        if(!(id in data.revenues)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        data.revenues[id] = await request.json() as Revenue
        return HttpResponse.json(data.revenues[id])
    }),
    http.post('/api/revenues', async (req) => {
        await delay()
        const { request } = req

        const bill = await request.json() as Revenue
        const id = uuidv4()
        data.revenues[id] = {
            ...bill,
            id
        }
        return HttpResponse.json(
            data.revenues[id]
        )
    }),

    http.delete('/api/revenues/:id', async (req) => {
        await delay()
        const { params } = req
        const { id } = params
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
        if(!(id in data.revenues)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        delete data.revenues[id]
        return new HttpResponse(
            null,
            {
                status: 204
            }
        )
    })
]

export { revenuesHandlers }