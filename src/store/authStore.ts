// stores/globalStore.ts
import { create } from 'zustand';

// Define the type for the store state
interface AuthStoreState {
    userNumber: string;
    setUserNumber: (phone: string) => void;
}

// Create the store with TypeScript types
export const useAuthStore = create<AuthStoreState>((set) => ({
    userNumber: '',
    setUserNumber:(userNumber: string) => set(state => ({ ...state, userNumber: userNumber })),
}));

export default useAuthStore;
