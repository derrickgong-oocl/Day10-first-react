import { create } from 'zustand';
import todoItems from '../todoItems.json';

export const useRegisterStore = create((set, get) => ({
    // 使用 JSON 文件初始化 todos
    todos: todoItems,
    
    // 表单输入状态
    formData: { todo: '' },

    // 设置输入框内容
    setNewTodo: (value) => set({ formData: { todo: value } }),

    // 添加新 todo
    sendTodo: () => {
        const { formData, todos } = get();
        const newTitle = formData.todo.trim();
        if (!newTitle) return;

        const newTodo = {
            id: Date.now(), // 保证唯一性
            title: newTitle,
            completed: false
        };

        set({
            todos: [...todos, newTodo],
            formData: { todo: '' } // 清空输入框
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

    // 过滤：获取未完成的 todos
    uncompletedTodos: () => {
        const { todos } = get();
        return todos.filter(todo => !todo.completed);
    },

    // 清除已完成
    clearCompleted: () => {
        set((state) => ({
            todos: state.todos.filter(todo => !todo.completed)
        }));
    }
}));