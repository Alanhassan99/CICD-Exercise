import { create } from 'zustand'
import blogService from "./services/blogs";
const useBlogStore = create((set) => ({
  blogs: [],
  actions: {
    initializeBlogs: () => blogService.getAll().then(data => set(() => ({ blogs: data }))),
    createTheBlog: (object) => blogService.post(object).then(data => set(state => ({ blogs: state.blogs.concat(data) }))),
    blogRemove: (object) => blogService.remove(object).then(() => set(state => ({ blogs: state.blogs.filter(blog => blog.id !== object.id) }))),
    blogLike: (object) => blogService.put(object).then(data => set(state => ({ blogs: state.blogs.map(blog => blog.id === data.id ? data : blog) }))),
    blogComment: (id, comment) => blogService.addComment(id, comment).then(data => set(state => ({ blogs: state.blogs.map(blog => blog.id === data.id ? data : blog) })))
  }
}))


export default useBlogStore
export const useBlogs = () => {
  const blogs = useBlogStore((state) => state.blogs)
  return blogs.toSorted((a, b) => b.likes - a.likes)
}

export const useBlogActions = () => useBlogStore(state => state.actions)