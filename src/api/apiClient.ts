import axios from 'axios'; 

export interface Category {
    id: string;
    name: string;
    products: Product[]
}

export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    description?: string;
}

const API_BASE_URL='http://10.170.169.4:3001/api/v1';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    (config) => {
        return config;
    }, 
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("API Error:", error?.response?.data);
        return Promise.reject(error);
    }
);

let authInterceptor:number | null = null;

export const fetchCategories = async() => (await api.get("/categories")).data as Category;