export interface Amount {
    magnitude: number,
    unit: string
}

export interface MealInput {
    dateTime: string, 
    mealName: string,
}

export interface Meal {
    id: string,
    dateTime: string, 
    mealName: string,
    foods: {
        byIds: {
            [key:string]: {
                label: string,
                amount: Amount
            }
        },
        allIds: string[]
    }
}

export interface Food {
    id: string,
    name: string,
    metadata: {}
}

export interface RecipeInput {
    name: string
}

export interface Recipe {
    id: string,
    name: string,
    ingredients?: {
        byIds: {
            [key:string]: {
                label: string,
                amount: Amount
            }
        },
        allIds: string[]
    },
    steps?: {},
    output?: {
        id: string,
        description: string,
        amount: Amount
    }
}