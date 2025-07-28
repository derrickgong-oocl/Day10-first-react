// 简单的 JSX 示例
function SimpleComponent() {
    const name = "World";
    const items = ["Apple", "Banana", "Orange"];
    
    return (
        <div className="container">
            <h1>Hello {name}!</h1>
            <p>This is a simple JSX example</p>
            <ul>
                {items.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <button onClick={() => alert("Clicked!")}>
                Click me
            </button>
        </div>
    );
}

// 导出到全局
window.SimpleComponent = SimpleComponent; 