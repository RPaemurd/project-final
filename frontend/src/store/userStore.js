import { create } from "zustand";
import { persist } from "zustand/middleware" //saves the zustand storen in localstorage

const useUserStore = create(
    persist(
        (set) => ({

        user: null,
        accessToken: null,
        isLoggedIn: false,

        login: (userData) => set({
            user: { email: userData.email, id: userData.id },
            accessToken: userData.accessToken,
            isLoggedIn: true
        }),

        logout: () => set({ user: null, accessToken: null, isLoggedIn: false })
        }),
        { name: "user-store" }
    )
);

export default useUserStore