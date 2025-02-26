import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const prepareHeaders = async (headers : Headers) => {
    const storedToken = localStorage.getItem('token');
    console.log('storedToken', {storedToken})
    if (storedToken) {
        headers.set('Authorization', `Bearer ${storedToken}`);
    }
    return headers;
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders
    }),
    tagTypes: ['All'],
    endpoints: () => ({})
})