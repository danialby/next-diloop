// stores/globalStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

// Define the type for the store state
interface AuthStoreState {
    userLoginNumber: string;
    setUserLoginNumber: (phone: string) => void;
}

// Create the store with TypeScript types
export const useAuthStore = create<AuthStoreState>(
    persist(
        (set, get) => ({
            userLoginNumber: '',
            setUserLoginNumber:(userLoginNumber: string) => set(state => ({ ...state, userLoginNumber: userLoginNumber })),
        }),
        {
            name: 'LOGIN_INFO', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }));

export default useAuthStore;
