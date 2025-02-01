import { Bill } from '../features/bills/billsMockTypes'
import { Budget } from '../features/budget/budgetMockTypes'

export interface Data {
    bills: {
        [key:string]: Bill
    },
    budget: Budget
}