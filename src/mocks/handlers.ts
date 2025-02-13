import { http, HttpResponse } from 'msw'

import { billsHandlers } from '../features/bills/billsMock';
import { budgetHandlers } from '../features/budget/budgetMock'
import { revenuesHandlers } from '../features/revenues/revenuesMock'
import { healthHandlers } from '../features/health/healthMock'
import { fitnessHandlers } from '../features/fitness/fitnessMock';
import { hobbiesHandlers} from '../features/hobbies/hobbiesMock'
import { eventsHandlers } from '../features/events/eventsMock';
import { remindersHandlers } from '../features/reminders/remindersMock';
import { jobLeadsHandlers } from '../features/jobLeads/jobLeadsMock'
import { jobsHandlers} from '../features/jobs/jobsMock'
import { mealsHandlers } from '../features/meals/mock'
import { recipesHandlers } from '../features/meals/recipesMock'
import { goalsHandlers } from '@/features/planning/mock';


import sampleData from './data.json'
import { Data } from './types'

const data : Data = sampleData as Data


export const handlers = [
    ...billsHandlers(data),
    ...budgetHandlers(data),
    ...revenuesHandlers(data),
    ...healthHandlers(data),
    ...fitnessHandlers(data),
    ...hobbiesHandlers(data),
    ...eventsHandlers(data),
    ...remindersHandlers(data),
    ...jobLeadsHandlers(data),
    ...jobsHandlers(data),
    ...mealsHandlers(data),
    ...recipesHandlers(data),
    ...goalsHandlers(data),
    // Catch-all route for any unhandled requests
    http.all('/api/*', () => {
        return new HttpResponse(null, {
            status: 404
        })
    })
]