import { delay, http, HttpResponse } from 'msw'
import { Data } from '../../mocks/types'
import { checkId, Triple } from '@/lib/types'

export const graphHandlers = (data : Data) => [
    http.get('/api/graph/get/:id', async (req) => {
        await delay()
        const { id } = req.params
        console.log({id})
        if(!(checkId(id, data.graph.bySubject) || checkId(id, data.graph.byObject))){
            return HttpResponse.json(null, {
                status: 404
            })
        }
        return HttpResponse.json({
            in: data.graph.bySubject[id] ?? [], 
            out: data.graph.byObject[id] ?? []
        })
    }),
    http.post('/api/graph/add', async (req) => {
        await delay()
        const { data : triples } = await req.request.json() as { data : Triple[]}
        triples.forEach(triple => {
            const [s,_p,o] = triple
            if(!(s in data.graph.bySubject)){
                data.graph.bySubject[s] = [triple]
            } else {
                data.graph.bySubject[s].push(triple)
            }
            if(!(o in data.graph.byObject)){
                data.graph.byObject[o] = [triple]
            } else {
                data.graph.byObject[o].push(triple)
            }
        })
        return HttpResponse.json()
    }),
    http.post('/api/graph/remove', async (req) => {
        await delay()
        const { data : triples } = await req.request.json() as { data : Triple[]}
        triples.forEach(triple => {
            const [s, p, o] = triple
            if(s in data.graph.bySubject){
                data.graph.bySubject[s] = data.graph.bySubject[s].filter(([s2, p2, o2] : string[]) => s2 !== s || p2 !== p || o2 !== o)
                if(data.graph.bySubject[s].length === 0){
                    delete data.graph.bySubject[s]
                }
            }
            if(o in data.graph.byObject){
                data.graph.byObject[o] = data.graph.byObject[s].filter(([s2,p2,o2] : string[]) => s2 !== s || p2 !== p || o2 !== o)
                if(data.graph.byObject[o].length === 0){
                    delete data.graph.byObject[o]
                }
            }
        })
    })
]