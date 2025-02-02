import { delay, http, HttpResponse } from 'msw'
import { Data } from '../../mocks/types'
import { Reminder } from './remindersTypes'
import { isArray } from '../../lib/types'
import { uuidv4 } from '../../uuid'



export const remindersHandlers = (data : Data) => [
    http.get('/api/reminders', async () => {
        await delay()
        return HttpResponse.json(data.reminders)
    }),
    http.post('/api/reminders', async (req) => {
        await delay()
        const { data: reminder } = await req.request.json() as { data : Reminder }
        const id = uuidv4()
        data.reminders[id] = {
            ...reminder,
            id
        }
        return HttpResponse.json(data.reminders[id])
    }),
    http.delete('/api/reminders/:id', async (req) => {
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
        if(!(id in data.reminders)){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        delete data.reminders[id]
        return HttpResponse.json()
    })
]