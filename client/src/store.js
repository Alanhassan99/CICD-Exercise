import { create } from 'zustand'
const useErrorStore = create((set) => ({
  errorMessage: null,
  actions: {
    error: () => {
      set(state => ({
        errorMessage: 'wrong username or password'
      }))

    },
  }
}))

export default useErrorStore
export const useErrorActions = () => useErrorStore(state => state.actions)
export const useErrorErrorMessage = () => useErrorStore(state => state.errorMessage)