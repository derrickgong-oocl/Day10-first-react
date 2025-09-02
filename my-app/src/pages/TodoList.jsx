import { useRegisterStore } from '../store/todoStore';
import style from './TodoList.module.css';
import React, {useState, useEffect} from 'react';
import { Link, NavLink} from 'react-router-dom';

function TodoItem({ title, completed, onToggle }) {
    const itemClassName = `${style.item} ${completed ? style.checked : ''}`;
    return (
        <li className={itemClassName}>
            <label>
                <input type="checkbox" checked={completed} onChange={onToggle} />
                {title} {completed && "✅"}
            </label>
        </li>
    );
}

export default function TodoList() {
    const [isFilter, setIsFilter] = useState(false);
    
    // 从 Zustand 获取状态和方法
    const { todos, toggleTodo, sendTodo, formData, setNewTodo } = useRegisterStore();

    // 过滤逻辑
    const displayedTodos = isFilter 
        ? todos.filter(todo => !todo.completed) 
        : todos;

    const handleSubmit = (e) => {
        e.preventDefault();
        sendTodo();
    };

    return (
        <div>

            <section className={style.todoList}>

            <h1>Sally Ride 的 Todo 清单</h1>

            <label>
                <input
                    type="checkbox"
                    checked={isFilter}
                    onChange={() => setIsFilter(!isFilter)}
                />
                过滤已完成的待办事项
            </label>

            <form onSubmit={handleSubmit} className={style.form}>
                <input
                    type="text"
                    id="todo"
                    placeholder="请添加TODO"
                    value={formData.todo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    required
                />
                <button type="submit">添加</button>
            </form>

            <ul className={style.list}>
                {displayedTodos.map(item => (
                    <TodoItem
                        key={item.id}
                        title={item.title}
                        completed={item.completed}
                        onToggle={() => toggleTodo(item.id)}
                    />
                ))}
            </ul>

            <button
                type="button"
                className={style.clearButton}
                onClick={() => useRegisterStore.getState().clearCompleted()}
            >
                清除已完成 ({todos.filter(t => t.completed).length})
            </button>

            
        </section>
        </div>
    );
}