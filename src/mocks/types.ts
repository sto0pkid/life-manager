import { Bill } from '../features/bills/billsMockTypes'
import { Budget } from '../features/budget/budgetMockTypes'
import { Revenue } from '../features/revenues/revenuesMockTypes'
import { Health } from '../features/health/healthMockTypes'

export interface Data {
    bills: {
        [key:string]: Bill
    },
    budget: Budget,
    revenues: {
        [key: string]: Revenue
    },
    health: Health
}