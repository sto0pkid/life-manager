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
import { graphHandlers } from '@/features/graph/mock'


import sampleData from './data.json'
import { Data } from './types'

function checkData(
    data : {
        graph: {
            triples: string[][],
            bySubject: {[key:string]: string[][]},
            byObject: {[key:string]: string[][]}
        }
    }
) : data is Data {
    data.graph.triples.forEach(t => {
        if(t.length !== 3){
            return false
        }
    })
    Object.keys(data.graph.bySubject).forEach(s => {
        data.graph.bySubject[s].forEach(t => {
            if(t.length !== 3){
                return false
            }
        })
    })
    Object.keys(data.graph.byObject).forEach(o => {
        data.graph.byObject[o].forEach(t => {
            if(t.length !== 3){
                return false
            }
        })
    })
    return true
}

const freshKB = () : Data => {
    return {
        bills: {},
        budget: {
            income: 0,
            expenses: 0
        },
        revenues: {},
        health: {
            weight: 0,
            height: 0,
            bloodPressure: '',
            heartRate: 0
        },
        fitness: {},
        hobbies: {},
        reminders: {},
        events: {},
        jobLeads: {},
        jobs: {},
        meals: {},
        recipes: {},
        goals: {},
        graph: {
            triples: [],
            bySubject: {},
            byObject: {}
        }
    }
}

const data : Data = checkData(sampleData) ? sampleData : freshKB()


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
    ...graphHandlers(data),
    // Catch-all route for any unhandled requests
    http.all('/api/*', () => {
        return new HttpResponse(null, {
            status: 404
        })
    })
]