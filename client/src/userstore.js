import { create } from 'zustand'
import loginService from "./services/login";
import blogService from "./services/blogs";

const useUserStore = create((set) => ({
  user: null,
  actions: {
    login: async ({ username, password }) => {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      set({ user });
    },
    logout: () => {
      window.localStorage.removeItem("loggedBlogappUser")
      set({ user: null })
    }


  },
}
))
export default useUserStore
export const useLoginActions = () => useUserStore(state => state.actions)
export const useUser = () => useUserStore(state => state.user)