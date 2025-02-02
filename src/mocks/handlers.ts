import { http, HttpResponse } from 'msw'
import sampleData from './data.json'
import { billsHandlers } from '../features/bills/billsMock';
import { budgetHandlers } from '../features/budget/budgetMock'
import { revenuesHandlers } from '../features/revenues/revenuesMock'
import { healthHandlers } from '../features/health/healthMock'
import { Data } from './types'
import { fitnessHandlers } from '../features/fitness/fitnessMock';
import { hobbiesHandlers} from '../features/hobbies/hobbiesMock'
import { eventsHandlers } from '../features/events/eventsMock';

const data : Data = sampleData as Data


export const handlers = [
    ...billsHandlers(data),
    ...budgetHandlers(data),
    ...revenuesHandlers(data),
    ...healthHandlers(data),
    ...fitnessHandlers(data),
    ...hobbiesHandlers(data),
    ...eventsHandlers(data),
    // Catch-all route for any unhandled requests
    http.all('/api/*', () => {
        return new HttpResponse(null, {
            status: 404
        })
    })
]