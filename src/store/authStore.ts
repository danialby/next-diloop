// stores/globalStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import {use} from "react";

// Define the type for the store state
interface AuthStoreState {
    userLoginNumber: string;
    auth_token: string;
    setUserLoginNumber: (phone: string) => void;
    setAuthToken: (phone: string) => void;
}

// Create the store with TypeScript types
export const useAuthStore = create<AuthStoreState>()(
    persist(
        (set) => ({
            userLoginNumber: '',
            setUserLoginNumber:(userLoginNumber: string) => set(state => ({ ...state, userLoginNumber: userLoginNumber })),
            auth_token: '',
            setAuthToken:(auth_token: string) => set(state => ({ ...state, auth_token: auth_token })),
        }),
        {
            name: 'LOGIN_INFO', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }));



export const getAuthToken = () => {
    const store = useAuthStore.getState()
    return store.auth_token
}

export default useAuthStore;
