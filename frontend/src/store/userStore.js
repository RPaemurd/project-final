import { create } from "zustand";

const useUserStore = create((set) => ({

    user: null, //no user from the beginning
    isLoggedIn: false, //not loged in from the start
            
    //function to log in
    login: (userData) => set({ user: userData, isLoggedIn: true }),

    logout: () => set({ user: null, isLoggedIn: false })
}));

export default useUserStore