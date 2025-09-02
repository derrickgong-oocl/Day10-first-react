import { todoListStore } from "../store/todoListStore.js";
import styles from "./TodoList.module.css";
import { useEffect } from "react";
import './ByPage.css';



function TodoItem({ title, completed, onToggle }) {
  const itemClassName = `${styles.item} ${completed ? styles.checked : ""}`;

  return (
    <li className={itemClassName}>
      <label>
        <input type="checkbox" checked={completed} onChange={onToggle} />
        {title} {completed && "✅"}
      </label>
    </li>
  );
}

export default function ByPage() {
  const {
      page,
      size,
      todo,
      getFilteredItems,
      isFilter,
      handleItemToggle,
      setIsFilter,
      getPackedCount,
      handleInputChange,
      newItemName,
      handleAddItem,
      clearCompletedItems,
      fetchTodosByPage,
      setPage,
      setSize
    } = todoListStore();


  useEffect(() => {
    fetchTodosByPage();
  }, []);

  return (
    <section>
      <h1>Sally Ride 的 行李打包 清单</h1>
      <h1>(Zustand版本)</h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        fetchTodosByPage();
      }}>
        <input type="number" value={page} placeholder="页码" onChange={(e) => setPage(e.target.value)} />
        <input type="number" value={size} placeholder="每页数量" onChange={(e) => setSize(e.target.value)} />
        <button type="submit">查询</button>
      </form>
      
      <div>
        <label>
          <input
            type="checkbox"
            checked={isFilter}
            onChange={() => setIsFilter(!isFilter)}
          />
          过滤已打包的行李
        </label>
      </div>
      <div>
        <form onSubmit={handleAddItem}>
        <input
          type="text"
          value={newItemName}
          onChange={handleInputChange}
          placeholder="输入新物品名称"
        />
        <button type="submit" >添加</button>
        </form>
      </div>
      <ul>

        {getFilteredItems(todo).map((item) => (
          <TodoItem
            key={item.id}
            {...item}
            onToggle={() => handleItemToggle(item)}
          />
        ))}
      </ul>

      <button onClick={clearCompletedItems} disabled={getPackedCount() === 0}>
        清除已完成 ({getPackedCount()})
      </button>
  
    </section>
  );
}