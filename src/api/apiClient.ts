import axios, { AxiosError } from 'axios'; 

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

const API_BASE_URL='http://10.255.214.4:3001/api/v1';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    (config) => {
        console.log("📌 Requesting:", (config.baseURL || '') + (config.url || ''));
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

export function setAuthToken(token: string | null) {
    if(authInterceptor !== null) {
        api.interceptors.request.eject(authInterceptor);
    }
    if(token) {
        authInterceptor = api.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        })
    }
    else {
        authInterceptor = null;
    }
}

export const fetchCategories = async() => (await api.get("/categories")).data as Category;

// export const signUp = async(data:{email:string, password:string, phone:string}) => (await api.post("/auth/signup", data)).data;
export const signUp = async(data:any) => {
    console.log("⏳ signUp() called");
    console.log("📌 Posting to:", API_BASE_URL + "/auth/signup");
    console.log("📦 Payload:", data);

    try {
        const res = await api.post("/auth/signup", data);
        console.log("✅ Response:", res.data);
        return res.data;
    } catch (err) {
        const axiosErr = err as AxiosError;
        console.log("❌ Axios Error URL:", (axiosErr?.config?.baseURL || '') + (axiosErr?.config?.url || ''));
        console.log("❌ Axios Error Response:", axiosErr?.response?.data);
        throw err;
    }
};

export const login = async(data:{email:string, password:string}) => (await api.post("/auth/login", data)).data;
export const createRazorpayOrder = async (data: {amount:number; currency:string; receipt:string}) => (await api.post("/orders/create-razorpay-order", data)).data;
export const createOrder = async (data: {items: {productId: string; quantity:number; price:number}[]; totalAmount:number;address:any; paymentMethod:string; paymentId?:string; razorpayOrderId?:string}) => (await api.post("/orders", data)).data;
export const fetchMyOrders = async() => (await api.get("/orders/my-orders")).data;