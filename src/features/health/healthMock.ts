import { delay, http, HttpResponse } from 'msw'
import { Data } from '../../mocks/types'
import { Health } from './healthMockTypes'

const healthHandlers = (data : Data) => {
    return [
        http.get('/api/health', async () => {
            await delay()
            return HttpResponse.json(data.health)
        }),
        http.put('/api/health', async (req) => {
            await delay()
            data.health = await req.request.json() as Health
            return HttpResponse.json()
        })
    ]
}

export { healthHandlers }