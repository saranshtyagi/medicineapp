import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { setAuthToken } from "../api/apiClient";


export interface User {
    id: string; 
    email: string; 
    phone?: string; 
    name?: string;
}

type AuthState = {
    user: User | null,
    token: string | null,
    isAuthenticated: boolean; 
    setAuth: (user: User, token: string) => void,
    logout: () => void,
}

export const useAuthStore = create<AuthState>() (
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            setAuth: (user, token) => {
                setAuthToken(token); 
                set({user, token, isAuthenticated: true}); 
            }, 
            logout: () => {
                setAuthToken(null); 
                set({user: null, token: null, isAuthenticated: false});
            }
        }), {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage), 
            onRehydrateStorage: () => (state: AuthState | undefined) => {
                if(state?.token) {
                    setAuthToken(state.token);
                }
            }
        }
    )
)