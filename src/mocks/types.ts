import { Bill } from '../features/bills/billsMockTypes'
import { Budget } from '../features/budget/budgetMockTypes'
import { Revenue } from '../features/revenues/revenuesMockTypes'
import { Health } from '../features/health/healthMockTypes'
import { Activity } from '../features/fitness/fitnessMockTypes'
import { Hobby } from '../features/hobbies/hobbiesMockTypes'
import { Event } from '../features/events/eventsMockTypes'
import { Reminder } from '../features/reminders/remindersMockTypes'
import { JobLead } from '../features/jobLeads/jobLeadsMockTypes'
import { JobApplication } from '../features/jobs/jobsMockTypes'
import { Meal, Recipe } from '../features/meals/types'
import { Goal } from '../features/planning/types'

export interface Data {
    bills: {
        [key:string]: Bill
    },
    budget: Budget,
    revenues: {
        [key: string]: Revenue
    },
    health: Health,
    fitness: {
        [key:string]: Activity
    },
    hobbies: {
        [key:string]: Hobby
    },
    events: {
        [key:string]: Event
    },
    reminders: {
        [key: string]: Reminder
    },
    jobLeads: {
        [key: string]: JobLead
    },
    jobs: {
        [key: string]: JobApplication
    },
    meals: {
        [key: string]: Meal
    },
    recipes: {
        [key: string]: Recipe
    },
    goals: {
        [key: string]: Goal
    }
}