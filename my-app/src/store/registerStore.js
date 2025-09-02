import { create } from 'zustand';
import todoItems from '../todoItems.json';
import axios from "axios";


export const useRegisterStore = create((set, get) => ({
    // 使用 JSON 文件初始化 todos
    todos: todoItems,
    
    formData: { todo: '' },

    setNewTodo: (value) => set({ formData: { todo: value } }),

    sendTodo: () => {
        const { formData, todos } = get();
        const newTitle = formData.todo.trim();
        if (!newTitle) return;

        const newTodo = {
            id: Date.now(),
            title: newTitle,
            completed: false
        };

        set({
            todos: [...todos, newTodo],
            formData: { todo: '' }
        });
    },

    // 切换完成状态
    toggleTodo: (id) => {
        set((state) => ({
            todos: state.todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        }));
    },


    // // 过滤：获取未完成的 todos
    // uncompletedTodos: () => {
    //     const { todos } = get();
    //     return todos.filter(todo => !todo.completed);
    // },

    // 清除已完成
    clearCompleted: () => {
        set((state) => ({
            todos: state.todos.filter(todo => !todo.completed)
        }));
    }

}));