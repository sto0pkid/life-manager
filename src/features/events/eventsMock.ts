import { delay, http, HttpResponse } from 'msw'
import { Data } from '../../mocks/types'
import { Event } from './eventsMockTypes'
import { uuidv4 } from '../../uuid'
import { isArray } from '../../lib/types'

export const eventsHandlers = (data : Data) => [
    http.get('/api/events', async () => {
        await delay()
        return HttpResponse.json(data.events)
    }),
    http.post('/api/events', async (req) => {
        await delay()
        const body = await req.request.json() as {event: Event}
        const event = body.event
        const id = uuidv4()
        data.events[id] = {
            ...event,
            id
        }
        return HttpResponse.json(data.events[id])
    }),
    http.delete('/api/events/:id', async (req) => {
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
        if(!(id in data.events)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        delete data.events[id]
        return HttpResponse.json()
    })
]