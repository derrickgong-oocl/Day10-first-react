import { todoListStore } from "./store/todoListStore.js";
import styles from "./TodoList.module.css";
import { useEffect } from "react";


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

export default function TodoList() {
  const {
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
    fetchTodos,
  } = todoListStore();

  // 初始加载数据
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <section>
      <h1>Sally Ride 的 行李打包 清单</h1>
      <h1>(Zustand版本)</h1>
      
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
        {/* 使用过滤后的列表进行渲染 */}

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