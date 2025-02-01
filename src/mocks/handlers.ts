import { delay, http, HttpResponse } from 'msw'
import sampleData from './data.json'
import { uuidv4 } from '../uuid';

interface Bill {
    id: string;
    name: string;
    amount: number;
    dueDate: string | undefined;
    paid: boolean;
}
interface Data {
    bills: {
        [key:string]: Bill
    }
}

const data : Data = sampleData as Data

function isArray(value : string | readonly string[]): value is readonly string[] {
    return Array.isArray(value) && typeof value[0] === 'string'
}

const billsHandlers = [
    http.get('/api/bills', async () => {
        await delay()
        return HttpResponse.json(sampleData.bills)
    }),
    http.get('/api/bills/:id', async (req) => {
        await delay()
        console.log('/api/bills/:id')
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
        console.log(`/api/bills`)
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

export const handlers = [
    ...billsHandlers,
    // Catch-all route for any unhandled requests
    http.all('/api/*', () => {
        return new HttpResponse(null, {
            status: 404
        })
    })
]