import { delay, http, HttpResponse } from 'msw'
import { uuidv4 } from '../../uuid'
import { Hobby } from './hobbiesMockTypes'
import { isArray } from '../../lib/types'
import { Data } from '../../mocks/types'

export const hobbiesHandlers = (data : Data) => {
    return [
        http.get('/api/hobbies', async () => {
            await delay()
            return HttpResponse.json(data.hobbies)
        }),
        http.post('/api/hobbies', async (req) => {
            await delay()
            const { hobby } = await req.request.json() as {hobby: Hobby}
            console.log('/api/hobbies', {hobby})
            const id = uuidv4()
            data.hobbies[id] = {...hobby, id}
            return HttpResponse.json()
        }),
        http.delete('/api/hobbies/:id', async (req) => {
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
            if(!(id in data.hobbies)){
                return HttpResponse.json(null, {
                    status: 404
                })
            }
            delete data.hobbies[id]
            return HttpResponse.json()
        })
    ]
}