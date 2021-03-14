# 代码分割

[code](https://github.com/guoxiaxing/vite-react-ts)

## 打包

大多数 React 文件都会使用 webpack/rollup/Browserify 来进行打包

## 代码分割

## 动态 import()

在你的应用中引入代码分割的最佳方式是通过动态 import() 语法。 webpack 解析到这个语法的时候会自动将该引入的文件打包成一个单独的 chunk

## React.lazy()

React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）。

```
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

此代码将会在组件首次渲染时，自动导入包含 OtherComponent 组件的包。

React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件。

然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。

```
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

fallback 属性接受任何在组件加载过程中你想展示的 React 元素。你可以将 Suspense 组件置于懒加载组件之上的任何位置。你甚至可以用一个 Suspense 组件包裹多个懒加载组件。

## 捕获异常边界

```
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

## 基于路由的代码分割

```
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

## 命名导出

React.lazy 目前只支持默认导出（default exports）。如果你想被引入的模块使用命名导出（named exports），你可以创建一个中间模块，来重新导出为默认模块。这能保证 tree shaking 不会出错，并且不必引入不需要的组件

```
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```

# Context

在组件树之间传递数据的方式

## 何时使用 Context

Context 目前是为了处理一些对于组件来说全局共享的数据

Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。

## API

### React.createContext(defaultValue)

```
React.createContext(defaultValue)
```

创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。

只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。

**将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。**

### Context.Provider

```
<MyContext.Provider value={/* 某个值 */}>
```

每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。

通过新旧值检测来确定变化，使用了与 Object.is 相同的算法。

### Class.contextType

```
// 静态属性
MyClass.contextType = MyContext;

// 声明之后就可以在组件内部通过this.context来访问Provider提供的value值 可以在任何生命周期中访问this.context包括render函数
```

### Context.Consumer

```
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

这种方式一般用在函数式组件身上

### Context.displayName

# 错误边界

## 错误边界

错误边界是一种 React 组件，这种组件可以捕获并打印发生在其**子组件树**任何位置的 JavaScript 错误，并且，它会渲染出备用 UI，而不是渲染那些崩溃了的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。

> 注意

> 错误边界无法捕获以下场景中产生的错误：

> 事件处理（了解更多）
> 异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
> 服务端渲染
> 它自身抛出来的错误（并非它的子组件）

class 组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。当抛出错误后，请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息。

**只有 class 组件才可以成为错误边界组件。**

## 未捕获错误（Uncaught Errors）的新行为

自 React 16 起，任何未被错误边界捕获的错误将会导致整个 React 组件树被卸载。

**错误边界可以冒泡**

## 关于事件处理器

错误边界无法捕获到事件处理函数中的错误

# Refs 转发

React.forwardRef

可以在祖先组件中使用其子组件

ref 不是 prop 属性。就像 key 一样，其被 React 进行了特殊处理。如果你对 HOC 添加 ref，该 ref 将引用最外层的容器组件，而不是被包裹的组件。
