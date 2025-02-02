import { delay, http, HttpResponse } from 'msw'
import { uuidv4 } from '../../uuid';
import { Data } from '../../mocks/types'
import { isArray } from '../../lib/types'
import { Bill } from './billsMockTypes'


const billsHandlers = (data : Data) => [
    http.get('/api/bills', async () => {
        await delay()
        return HttpResponse.json(data.bills)
    }),
    http.get('/api/bills/:id', async (req) => {
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
        if(!(id in data.bills)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        const bill = data.bills[id]
        return HttpResponse.json(bill)
    }),
    http.put('/api/bills/:id', async (req) => {
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
        if(!(id in data.bills)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        data.bills[id] = await request.json() as Bill
        return HttpResponse.json(data.bills[id])
    }),
    http.post('/api/bills', async (req) => {
        await delay()
        const { request } = req

        const bill = await request.json() as Bill
        const id = uuidv4()
        data.bills[id] = {
            ...bill,
            id
        }
        return HttpResponse.json(
            data.bills[id]
        )
    }),

    http.delete('/api/bills/:id', async (req) => {
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
        if(!(id in data.bills)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        delete data.bills[id]
        return new HttpResponse(
            null,
            {
                status: 204
            }
        )
    })
]

export { billsHandlers }