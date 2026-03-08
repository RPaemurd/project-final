import { create } from "zustand";
import { persist } from "zustand/middleware" //saves the zustand storen in localstorage

const useUserStore = create(
    persist(
        (set) => ({

        user: null, //no user from the beginning
        isLoggedIn: false, //not loged in from the start
            
        //function to log in
        login: (userData) => set({ user: userData, isLoggedIn: true }),

        logout: () => set({ user: null, isLoggedIn: false })
        }),
        { name: "user-store" }
    )
);

export default useUserStore