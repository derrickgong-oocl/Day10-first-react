# JSX Demo - JSX 编译演示项目

这是一个演示 JSX 如何编译为普通 JavaScript 的简单项目。项目使用 esbuild 作为编译器，展示了 JSX 语法转换为 `h()` 函数调用的过程。

## 项目结构

```
jsx-demo/
├── README.md           # 项目说明文档
├── package.json        # 项目配置
├── build-simple.js     # 编译脚本
├── simple-demo.jsx     # 简单 JSX 示例
├── dist/              # 编译输出目录
└── node_modules/      # 依赖包
```

## 快速开始

### 安装依赖
```bash
npm install
```

### 编译 JSX 文件
```bash
npm run build
```

## JSX 编译演示

### 原始 JSX 代码 (simple-demo.jsx)

```jsx
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
```

### 编译后的 JavaScript 代码 (dist/simple-demo.js)

```javascript
(() => {
  function SimpleComponent() {
    const name = "World";
    const items = ["Apple", "Banana", "Orange"];
    return /* @__PURE__ */ h(
      "div",
      { className: "container" },
      /* @__PURE__ */ h("h1", null, "Hello ", name, "!"),
      /* @__PURE__ */ h("p", null, "This is a simple JSX example"),
      /* @__PURE__ */ h(
        "ul",
        null,
        items.map((item) => /* @__PURE__ */ h("li", { key: item }, item))
      ),
      /* @__PURE__ */ h("button", { onClick: () => alert("Clicked!") }, "Click me")
    );
  }
  window.SimpleComponent = SimpleComponent;
})();
```

## JSX 编译规则

### 1. 元素转换
- `<div>` → `h("div", null, ...)`
- `<div className="container">` → `h("div", { className: "container" }, ...)`

### 2. 属性转换
- `className` → `className` (保持不变)
- `onClick={...}` → `onClick: ...` (对象属性)
- `key={item}` → `key: item` (特殊属性)

### 3. 子元素转换
- 文本内容直接作为参数传递
- 表达式 `{name}` 作为参数传递
- 嵌套元素递归转换为 `h()` 调用

### 4. 条件渲染和循环
- `{items.map(...)}` 保持 JavaScript 语法不变
- 在 `h()` 函数调用中执行

## h 函数说明

`h` 函数是虚拟 DOM 的创建函数，用于创建虚拟 DOM 节点对象：

```javascript
function h(type, props, ...children) {
  return {
    type: type,           // 元素类型
    props: props || {},   // 属性对象
    children: children.flat()  // 子元素数组
  };
}
```

### h 函数参数
- `type`: 元素类型（字符串如 "div", "h1" 或组件函数）
- `props`: 属性对象
- `children`: 子元素（可以是文本、数字、虚拟节点等）

## 编译配置

项目使用 esbuild 进行编译，配置如下：

```javascript
{
  entryPoints: ['simple-demo.jsx'],
  bundle: true,
  outfile: 'dist/simple-demo.js',
  format: 'iife',
  jsx: 'transform',        // 将 JSX 转换为函数调用
  jsxFactory: 'h',         // 使用 h 函数作为 JSX 工厂函数
  jsxFragment: 'Fragment', // 使用 Fragment 处理空标签
  minify: false,
  sourcemap: true
}
```

## 依赖说明

- **esbuild**: 快速的 JavaScript 打包器和编译器
- 无其他运行时依赖，专注于编译演示

## 使用场景

这个项目适用于：
- 学习 JSX 编译原理
- 理解虚拟 DOM 概念
- 研究前端构建工具
- 自定义 JSX 编译器

## 扩展阅读

- [JSX 官方文档](https://reactjs.org/docs/introducing-jsx.html)
- [esbuild 文档](https://esbuild.github.io/)
- [虚拟 DOM 概念](https://reactjs.org/docs/faq-internals.html)

## 许可证

MIT License 