# Hook 概览

## state hook

```
import React, { useState } from 'react';
export default function Counter() {
  const [count, setCount] = useState(0);
  const add = () => setCount(count + 1);
  return (
    <>
      <h2>Count: {count}</h2>
      <button onClick={add}>add</button>
    </>
  );
}
```

React 会在重复渲染时保留这个 state。useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。

它类似 class 组件的 this.setState，但是它**不会把新的 state 和旧的 state 进行合并。**

初始的 state 只有在第一次渲染的时候可以被用到

可以在一个组件中使用多个 useState 的 hook

**hook 不能在 class 组件中使用**

## effect hook

useEffect

数据获取、订阅或者手动修改过 DOM

它和 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API。

```
export default function Counter() {
  const [count, setCount] = useState(0);
  const add = () => setCount(count + 1);
  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    document.title = `You click ${count} time !!`;
  });
  return (
    <>
      <h2>Count: {count}</h2>
      <button onClick={add}>add</button>
    </>
  );
}
```

调用这个就是在告诉 React 在完成对 DOM 的更改后运行‘副作用’函数，由于副作用函数是在组件的内部定义的，所以它是可以访问到 state 和 props 的，理论上 React 会在完成 DOM 的更改之后调用副作用 --- 包括第一次渲染

可以返回一个函数来清除副作用

可以在组件中多次使用副作用

每次页面更新的时候都会调用

## hook 的使用规则

- 只能在组件的最外层调用 hook，不能在条件/循环中使用 hook

- 只能在 React 函数组件中调用 hook。不要在其他 JavaScript 函数中调用。

## 自定义 hook

Hook 的每次调用都有一个完全独立的 state

函数命名需要以 use 开头

# state hook

# effect hook

通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。

React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。

每一个 effect 都属于一次特定的渲染

effect 可以返回一个函数用于进行一些清除操作，会在进行清除操作的时候调用这个函数

这就是为什么 React 会在执行当前 effect 之前对上一个 effect 进行清除。（所以组件第一次渲染的时候是不会执行清除操作的）

可以在一个组件中使用多个 useEffect，会按照你定义的顺序依次执行

## useEffect 性能优化

```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

> 如果你要使用此优化方式，请确保数组中包含了所有外部作用域中会随时间变化并且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量。

> 如果只想运行一次 useEffect(在组件挂载和卸载的时候)，那么可以给组件的第二个参数传递一个[]

# hook 规则

## 只在最顶层使用 hook

不要在循环，条件或嵌套函数中调用 Hook

遵循这个规则就可以保证在一次渲染中，你定义的 hook 可以被按照顺序调用

## 只在 React 函数中调用 hook

- react 函数组件中

- 自定义 hook 中

## eslint-plugin-react-hooks 插件来强制执行这两个规则

## 规则说明

1. 我们知道可以在一个函数式组件中使用多个 useState/useEffect hook 那么 React 怎么知道哪个 state 对应哪个 useState？答案是 React 靠的是 Hook 调用的顺序。

只要 Hook 的调用顺序在多次渲染之间保持一致，React 就能正确地将内部 state 和对应的 Hook 进行关联

如果我们想要有条件地执行一个 effect，可以将判断放到 Hook 的内部

# 自定义 hook

自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。

# hook api

## useState

```
const [state, setState] = useState(initialVal)
```

setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列。

以后每一次渲染 useState 返回的数组的第一个元素都是更新后最新的值

**React 会确保 setState 函数的标识是稳定的，并且不会在组件重新渲染时发生变化。**

所以 setState 函数可以不做为 useEffect 的依赖列表中的值

**如果新的 state 需要依赖于先前的 state 计算得到，那么可以给 setState 传递一个函数(该函数将接收先前的 state，并返回一个更新后的值)，该函数的第一个参数就是当前最新的 state**

**如果你的更新函数返回值与当前 state 完全相同，则随后的重渲染会被完全跳过。React 是通过 Object.is 来比较两个 state 是否相等的**

## useEffect

赋值给 useEffect 的函数会在**组件渲染到屏幕之后**执行。不会阻塞浏览器渲染

为防止内存泄漏，清除函数会在组件卸载前执行。另外，如果组件多次渲染（通常如此），则在执行下一个 effect 之前，上一个 effect 就已被清除。

设置 useEffect 的依赖列表的时候需要注意：请确保数组中包含了所有外部作用域中会发生变化且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量。

## useContext

```
const value = useContext(MyContext);
```

接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。

当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。即使祖先使用 React.memo 或 shouldComponentUpdate，也会在组件本身使用 useContext 时重新渲染。

useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>。

## useReducer

**React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。**

## useCallback 对传入的函数进行缓存

**useMemo 是对传入函数的返回值进行缓存**

```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

## useMemo

```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。

## useRef

```
const refContainer = useRef(initialValue);
```

useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。**返回的 ref 对象在组件的整个生命周期内保持不变**。

## useImperativeHandle

```
useImperativeHandle(ref, createHandle, [deps])
```

useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：

## useLayoutEffect

其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

# hook fqa
