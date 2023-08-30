import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

const useAuth = create(
    devtools(
        persist(
            (set) => ({
                token: null,

                login: ({ token }) => set(() => ({ token })),
                register: ({ token }) => set(() => ({ token })),
                logout: () => set(() => ({ token: null })),
            }),
            {
                name: "auth-data",
                storage: createJSONStorage(() => AsyncStorage)
            }
        )
    )
)

export default useAuth