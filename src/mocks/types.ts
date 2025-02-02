import { Bill } from '../features/bills/billsMockTypes'
import { Budget } from '../features/budget/budgetMockTypes'
import { Revenue } from '../features/revenues/revenuesMockTypes'
import { Health } from '../features/health/healthMockTypes'
import { Activity } from '../features/fitness/fitnessMockTypes'
import { Hobby } from '../features/hobbies/hobbiesMockTypes'
import { Event } from '../features/events/eventsMockTypes'
import { Reminder } from '../features/reminders/remindersMockTypes'

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
    }
}