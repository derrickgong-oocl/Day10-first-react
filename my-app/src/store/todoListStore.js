import { create } from "zustand";
import Api from "../services/api";

export const todoListStore = create((set, get) => ({
  todos: [],
  loading: false,
  error: null,
  page: 1,
  size: 10,
  setPage: (page) => set({ page: Number(page) || 1 }),
  setSize: (size) => set({ size: Number(size) || 1 }),

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const data = await Api.get(`/api/v1/todos`);
      const activetodo = data.filter(todo => todo.status === "active");
      set({ todos: activetodo, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchTodosByPage: async () => {
    set({ loading: true, error: null });
    try {
      const { page, size } = get();
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('size', size);
      const data = await Api.get(`/api/v1/todos/page?${params.toString()}`);
      const activetodo = data.filter(todo => todo.status === "active");
      set({ todos: activetodo, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  isFilter: false,
  setIsFilter: () => set((state) => ({ isFilter: !state.isFilter })),
  handleItemToggle: (item) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  getFilteredItems: () => {
    const { isFilter, todos } = get();
    if (!Array.isArray(todos)) return [];
    return isFilter ? todos.filter((item) => !item.completed) : todos;
  },
  getPackedCount: () => {
    const { todos } = get();
    return todos.filter((item) => item.completed).length;
  },
  newItemName: "",
  handleInputChange: (e) => {
    set({ newItemName: e.target.value });
  },
  handleAddItem: async (e) => {
    e.preventDefault();
    const { newItemName } = get();
    const { todos } = get();
    if (newItemName.trim() === "") return;
    const newItem = {
      id: todos.length + 1,
      title: newItemName,
      status: "active",
      completed: false,
    };
    try {
      const data = await Api.post("/api/v1/todos", newItem);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
    set((state) => ({
      todos: [...state.todos, newItem],
      newItemName: "",
    }));
  },
 clearCompletedItems: async () => {
  const { todos } = get();
  const completedItems = todos.filter(item => item.completed);
  if (completedItems.length === 0) return;

  set({ loading: true, error: null });
  try {
    await Promise.all(
      completedItems.map(item =>      
        Api.delete(`/api/v1/todos/${item.id}`)
      )
    );
    set({ 
      todos: todos.filter(item => !item.completed),
      loading: false     
    });
  } catch (error) {
    set({
      error: error.message || "删除失败，请重试",
      loading: false
    });
  }
},

}));