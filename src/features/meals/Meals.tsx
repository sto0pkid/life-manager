import React from 'react';
import { useFetchMealsQuery } from './api'
import { Meal, Recipe, Amount } from './types'

import { useFetchRecipesQuery} from './recipesApi'

const RecipeIngredient : React.FC<{
    food: {
        name: string
    }
    amount: Amount
}> = ({
    food,
    amount
}) => {
    return (
        <div>
            {food.name} - {amount.magnitude} {amount.unit}
        </div>
    )
}

const RecipeIngredients : React.FC<{
    ingredients: {
        byIds: {
            [key:string]: {
                label: string,
                amount: Amount
            }
        },
        allIds: string[]
    }
}> = ({
    ingredients
}) => {
    return (
        <ul>
            {
                ingredients.allIds.map(foodId => {
                    const food = ingredients.byIds[foodId]
                    return (
                        <li key={foodId}>
                            <RecipeIngredient
                                food={{name: food.label}}
                                amount={food.amount}
                            ></RecipeIngredient>
                        </li>
                    )
                })
            }
        </ul>
    )
}

const RecipeCard : React.FC<{
    recipe : Recipe
}> = ({
    recipe
}) => {
    const ingredients = recipe.ingredients
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{recipe.name}</h2>
                <div>
                    <h3>Ingredients</h3>
                    {
                        ingredients
                        ? (
                            <RecipeIngredients ingredients={ingredients}/>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

const RecipesList : React.FC = () => {
    const { data : recipes } = useFetchRecipesQuery()

    return (
        <div className="flex">
            {
                recipes
                ? (
                    Object.keys(recipes).map(recipeId => {
                        const recipe = recipes[recipeId]
                        return (
                            <div key={recipeId}>
                                <RecipeCard recipe={recipe}/>
                            </div>
                        )
                    })
                ) : (
                    <span className="loading loading-spinner loading-md"></span>
                )
            }
        </div>
    )
}

const MealFoodItem : React.FC<{
    food: {
        name: string
    }
    amount: Amount
}> = ({
    food,
    amount
}) => {
    return (
        <div>
            {food.name} - {amount.magnitude} {amount.unit}
        </div>
    )
}

const MealCard : React.FC<{
    meal : Meal
}> = ({
    meal
}) => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{meal.mealName} - {meal.dateTime}</h2>
                <ul>
                    {
                        meal.foods.allIds.map(foodId => {
                            const food = meal.foods.byIds[foodId]
                            return (
                                <li key={foodId}>
                                    <MealFoodItem food={{name: food.label}} amount={food.amount}></MealFoodItem>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

const MealsList : React.FC = () => {
    const { data : meals} = useFetchMealsQuery()

    return (
        <div className="flex">
            {
                typeof meals !== 'undefined'
                ? (
                    Object.keys(meals).map(mealId => {
                        const meal = meals[mealId]
                        return (
                            <div key={mealId}>
                                <MealCard meal={meal}/>
                            </div>
                        )
                    })
                ) : (
                    <span className="loading loading-spinner loading-md"></span>
                )
            }
        </div>
    )
}

const Meals: React.FC = () => {

    return (
        <div className="p-4">
            <h1 className="text-2xl">Meal Planning</h1>
            <p>Manage your meals and recipes here.</p>
            <div className="divider">
                <h2 className="text-xl">Meals</h2>
            </div>
            <div>
                <MealsList/>
            </div>
            <div className="divider">
                <h2 className="text-xl">Recipes</h2>
            </div>
            <div>
                <RecipesList/>
            </div>
        </div>
    );
};

export default Meals;