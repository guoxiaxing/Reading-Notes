# React

## React.Component

## React.PureComponent

与 React.Component 的区别就是，PureComponent 通过对 props 和 state 进行**浅比较(===)**的方式实现了 shouldComponentUpdate，会跳过该组件和其子组件的更新

## React.memo

```
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```

如果你的组件在相同 props 的情况下渲染相同的结果，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

memo 仅检查 props

默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。

```
// 自定义的比较函数接受两个参数，第一个是之前的props，第二个为新的props
function areEqual(prevProps, nextProps) {
  /*
  返回 true --- 不更新
  返回 false --- 更新
  */
}
```

## React.createElement

```
React.createElement(
  type,
  [props],
  [...children]
)
```

## React.cloneElement

```
React.cloneElement(
  element,
  [props],
  [...children]
)
```

以 element 元素为样板克隆并返回新的 React 元素。返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。新的子元素将取代现有的子元素，而来自原始元素的 key 和 ref 将被保留。

等同于

```
<element.type {...element.props} {...props}>{children}</element.type>
```

## React.createFactory

```
React.createFactory(type)
```

## React.isValidElement

```
React.isValidElement(object)
```

验证对象是否为 React 元素，返回值为 true 或 false。

## React.children

## React.Fragment

## React.createRef

## React.forwardRef

React.forwardRef 会创建一个 React 组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。

React.forwardRef 接受渲染函数作为参数。React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点。

```
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

React 会将 <FancyButton ref={ref}> 元素的 ref 作为第二个参数传递给 React.forwardRef 函数中的渲染函数。该渲染函数会将 ref 传递给 <button ref={ref}> 元素。

因此，当 React 附加了 ref 属性之后，ref.current 将直接指向 <button> DOM 元素实例。

## React.lazy

React.lazy() 允许你定义一个动态加载的组件。这有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件。

## React.Suspense

# React.Component

class 组件都继承自 React.Component 且必须要实现一个 render 方法

## 组件的生命周期

### Mounting

- constructor

**如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。**

应在其他语句之前前调用 super(props); 否则 this.props 可能会出现未定义的 bug

只有在 constructor 里面可以对 this.state 赋值，在其它方法中想要修改 state 需要使用 setState 方法。

需要避免在构造函数中引入任何副作用或者订阅，如果要执行这样的操作，请在 componentDidMount 中进行操作

- static getDerivedStateFromProps(props, state)

会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。

- render

- componentDidMount

componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。

### Updating

- static getDerivedStateFromProps

- shouldComponentUpdate(nextProps, nextState)

默认行为是 state 每次发生变化组件都会重新渲染。

props 或者 state 发生变化的时候，shouldComponentUpdate 会在渲染之前调用

首次渲染或者使用 forceUpdate 的话会忽略这个生命周期

**返回 false 并不会阻止子组件在 state 更改时重新渲染。**

不建议在 shouldComponentUpdate() 中进行深层比较或使用 JSON.stringify()。这样非常影响效率，且会损害性能。

- render

- getSnapshotBeforeUpdate(prevProps, prevState)

最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。

- componentDidUpdate(prevProps, prevState, snapshot)

### UnMounting

- componentWillUnmount

会在组件卸载及销毁之前调用，一般用来执行一些清理操作

### 错误处理

- static getDerivedStateFromError(error)

渲染阶段被调用，所以不允许有副作用

- componentDidCatch(error, info)

提交阶段被调用，可以有副作用

### 其它 API

- setState

不是立即更新 state，会批量推迟更新

如果想获取最新的 state 的值，可以通过 setState 的第二个参数（函数）来得到更新后的 state 的值

如果依赖新的 state 做一些操作的话，第一个参数可以传递一个函数，该函数的参数就是 state （(state, props) => stateChange 会将该函数的返回值和 state 进行浅合并）

- forceUpdate(callback)

强制让组件重新渲染

调用 forceUpdate 将会强制调用组件的 render 方法

### class 属性

- defaultProps

- displayName

### 实例属性

- state

- props

this.props.children

[生命周期图](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

# ReactDOM

## ReactDOM.render()

## ReactDOM.hydrate()

与 render() 相同，但它用于在 ReactDOMServer 渲染的容器中对 HTML 的内容进行 hydrate 操作。React 会尝试在已有标记上绑定事件监听器。

## ReactDOM.unmountComponentAtNode(container)

从 DOM 中卸载组件，会将其事件处理器（event handlers）和 state 一并清除。成功返回 true，失败返回 false

## ReactDOM.createProtal

# DOM 元素

React 实现了一套独立于浏览器的 DOM 系统，兼顾了性能和跨浏览器的兼容性

React 中，所有的 DOM 属性（包括事件）都应该是小驼峰命名

例外的情况是 aria-\* 以及 data-\* 属性，一律使用小写字母命名。比如, 你依然可以用 aria-label 作为 aria-label。

## 属性差异

- checked --- 控制 type=checkbox/radio 的受控组件是否选中，defaultChecked --- 用于非受控组件的初始化

- className

- dangerouslySetInnerHTML

dangerouslySetInnerHTML 是 React 为浏览器 DOM 提供 innerHTML 的替换方案(直接设置 html 容易造成 XSS 攻击)

```
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

- htmlFor

label 标签的 for 属性在 React 中替换为了 htmlFor

- onChange

- selected

如果在 React 中想让 select 元素默认选中，则使用 value/defaultValue 来赋予它 option 标签的 value 即可

- style

接受一个用小驼峰命名 css 属性的 JS 对象

浏览器会自动在属性值为数字的后面加上 px

如果需要使用其它单位，则需要写成字符串

- value

受控组件

- defaultValue

非受控组件，用于值的初始化

# 合成事件 （SyntheticEvent）

会对 DOM 的事件对象进行了包装，提供了跨浏览器的兼容性

当你需要使用浏览器的底层事件时，只需要使用 nativeEvent 属性来获取即可。

监听焦点的进入与离开

你可以使用 currentTarget 和 relatedTarget 来区分聚焦和失去焦点是否来自父元素外部。
