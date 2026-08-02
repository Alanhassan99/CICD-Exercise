import { create } from 'zustand'
import usersService from "./services/users";
const useUsersStore = create((set) => ({
  users: [],
  actions: {
    initializeUsers: () => usersService.getAll().then(data => set(() => ({ users: data }))),

  }
}))


export default useUsersStore
export const useUsers = () => {
  const users = useUsersStore((state) => state.users)
  return users
}

export const useUsersActions = () => useUsersStore(state => state.actions)