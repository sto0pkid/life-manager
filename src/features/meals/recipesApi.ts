import { baseApi } from '../../baseApi'
import { Recipe } from './types'

const RECIPES_API_ENDPOINT = '/recipes'

const recipesApi = baseApi
    .enhanceEndpoints({addTagTypes: ['Recipes']})
    .injectEndpoints({
        endpoints: (builder) => ({
            fetchRecipes: builder.query<{[key:string]: Recipe}, void>({
                query: () => `${RECIPES_API_ENDPOINT}`,
                providesTags: (result) => [
                    { type: 'All' as const},
                    { type: 'Recipes' as const, id: 'LIST'},
                    ...(
                        result
                        ? Object.keys(result).map(id => ({ type : 'Recipes' as const, id}))
                        : []
                    )
                ]
            }),
            getRecipeById: builder.query<Recipe, string>({
                query: (id) => `${RECIPES_API_ENDPOINT}/${id}`,
                providesTags: (_result, _error, arg) => [
                    { type : 'All' as const},
                    { type : 'Recipes' as const, id: arg}
                ]
            }),
            createRecipe: builder.mutation<Recipe, Recipe>({
                query: (data) => ({
                    url: `${RECIPES_API_ENDPOINT}`,
                    method: 'POST',
                    body: { data }
                }),
                invalidatesTags:[
                    { type : 'Recipes' as const, id: 'LIST'}
                ]
            }),
            deleteRecipe: builder.mutation<void, string>({
                query: (id) => ({
                    url: `${RECIPES_API_ENDPOINT}/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: [
                    { type : 'Recipes' as const, id: 'LIST'}
                ]
            })
        })
    })

export const {
    useFetchRecipesQuery,
    useCreateRecipeMutation,
    useDeleteRecipeMutation,
    useGetRecipeByIdQuery,
} = recipesApi