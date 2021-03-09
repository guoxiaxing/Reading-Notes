## 创建 TS 的 React 项目

```
create-react-app my-app --scripts-version=react-scripts-ts // 已废弃
// 使用

create-react-app my-app --template typescript
```

创建了 ts 的 React 项目之后还是会 tsconfig.json 的配置里面的 jsx 选项会报错，在网上查了一下说是 vs code 的 TS 的版本有问题

但是我在项目的根目录下创建了.vscode/settings.json 并且添加了

```
{
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

但是这个时候还是不能选 TS 的版本，用的依旧是本地的 ts 版本。

# JSX

- 语法

```
const ele = <h1>Hello World!</h1>;
```

- JSX 中使用表达式

{} (React) 而不是 {{}} (Angular)

可以在 {} 中放任何有效的 JavaScript 表达式

**如果 JSX 有多行，建议包裹在()中，防止 JavaScript 自动加分号**

```
const str = "Hello World!";
const ele = <h1>{str}</h1>;
```

- JSX 也是一个表达式，所以我们可以根据条件判断来决定返回的具体渲染内容

```
function App() {
  const greet = isH1 => (isH1 ? <h1>Hello World!</h1> : <h2>Hello XXX!</h2>);
  return <div className="App">{greet(true)}</div>;
}
```

- JSX 的特定属性

为属性指定一个字符串的值

```
const element = <div tabIndex="0"></div>;
```

为属性指定一个变量的值，需要使用{}

```
const element = <img src={user.avatarUrl}></img>;
```

> 因为 JSX 更接近于 JavaScript 而不是 HTML，所以 JSX 的属性名采用的是小驼峰命名，而不是-分隔，eg: class -> className; tabindex -> tabIndex

- 使用 JSX 指定子元素

JSX 的标签内如果没有内容，可以直接闭合

JSX 一个标签内部可以包含多个子元素，但是注意，**JSX 只能有一个根元素**

- JSX 的防注入攻击

直接使用{}来渲染变量（可能是用户的输入）是安全的，因为 ReactDOM 在渲染所有输入内容之前都会进行转义，所有内容在渲染之前都会被转义成字符串，可以有效的防止 XSS 攻击

- JSX 表示对象

Babel 会将 JSX 转换成一个名为 React.createElement 的函数调用

```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

等价于

```
const element = React.createElement('h1', {className: 'greeting'}, 'Hello, World!')
```

React.createElement 会预先进行一些检查，以便帮助你编写无错代码，实际上，它创建了一个对象

```
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

这些对象被称为 “React 元素”。它们描述了你希望在屏幕上看到的内容。React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。

# 元素渲染

与 DOM 元素不同， React 元素是创建开销极小的普通对象。 React DOM 会负责更新 DOM 来与 React 元素保持一致。

组件是由元素构成的。

- 将一个元素渲染为 DOM

我们的 html 里面通常会有一个

```
<div id="root"></div>
```

元素，我们将它称为根 DOM 节点，因为该节点内的所有内容都将由 React DOM 管理。

仅使用 React 构建的元素通常只有一个单一的根 DOM 节点

想将一个 React 元素渲染到根 DOM 节点中，需要使用 ReactDOM.render()

```

const ele = <h1>Hello World!</h1>;

ReactDOM.render(ele, document.getElementById('root'))
```

- 更新已渲染的元素

React 元素是一个不可变的对象。一旦创建，你就无法改变它的子元素或者属性，它代表的是某一时刻的 UI。

更新它的方式就是创建一个新的元素，传给 ReactDOM.render(在实践中，一个应用一般只会调用一次 ReactDOM.render)

```
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

每秒都会创建新的元素，传递给 ReactDOM.render

- React 只更新它需要更新的部分

React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。

# 组件 & props

组件，类似于 JavaScript 函数，接受的参数是 props，返回想要展示的 React 元素（函数式组件就是这样的）

- 函数式组件和类组件

函数式组件 --- 无状态组件

```
function App(props) {
  return (
    <div className="App">
      <h1>Hello {props.name}!</h1>{" "}
    </div>
  );
}

```

该函数是一个有效的组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

```

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello {this.props.name}!</h1>
      </div>
    );
  }
}
```

- 渲染组件

```
const ele = <App name='World'>
```

React 元素可以是 html 标签，也可以是 React 组件

当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 “props”。

可以通过`props.children`来访问到 React 组件内部的子元素

> **组件名称必须以大写字母开头。** React 会将以小写字母开头的组件视为原生 DOM 标签。例如，<div /> 代表 HTML 的 div 标签，而 <Welcome /> 则代表一个组件，并且需在作用域内使用 Welcome。

- 组合组件

组件可以在其输出中引用其他组件。

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

- 提取组件

- props 只读

组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

# state & 生命周期

1. 旧的更新组件的方式

```
import "./App.css";
import React, { Component } from "react";

function Clock(props) {
  return (
    <div className="App">
      <h1>Date is {props.date.toLocaleTimeString()} !</h1>{" "}
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Clock date={new Date()} />
      </div>
    );
  }
}

export default App;


import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

function tick() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

setInterval(tick, 1000);

```

可以发现，我们需要每秒钟重新调用 ReactDOM.render() 来渲染组件。如果我们希望只执行一次 ReactDOM.render 呢？此时就需要 state 来实现。

State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。

2. 将函数组件转换为 class 组件

```
import "./App.css";
import React, { Component } from "react";

class Clock extends Component {
  timer;
  constructor(props) {
    // Class 组件应该始终使用 props 参数来调用父类的构造函数。
    super(props);
    this.state = {
      date: new Date()
    };
  }

  // 会在组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date()
      });
    }, 1000);
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  render() {
    return (
      <div className="App">
        <h1>Date is {this.state.date.toLocaleTimeString()} !</h1>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Clock />
      </div>
    );
  }
}

export default App;


import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

调用 setState 来改变 state，告诉 react 需要更新页面

- 正确的使用 state

1. 不要直接修改 state（修改会生效，但是页面不会重新渲染）

```
// Wrong
this.state.comment = 'Hello';
```

而是应该使用 setState():

```
// Correct
this.setState({comment: 'Hello'});
```

构造函数是唯一可以给 this.state 赋值的地方

2. state 的更新可能是异步的。

出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。

因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

例如，此代码可能会无法更新计数器：

```
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

```
// Correct
// 这里使用箭头函数和普通函数都可以
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

3. state 的更新被合并

当你调用 setState 的时候，react 会将你更新的对象合并到当前的对象，也就是说 react 进行的是 patch 而不是 replace

这里的合并是浅合并，所以 this.setState({comments}) 完整保留了 this.state.posts， 但是完全替换了 this.state.comments。

- 数据是向下流动的

不管是父组件还是子组件，都无法知道其它组件是有状态还是无状态的，并且它们也不关心某个组件是 class 组件还是函数组件

可以将自己的 state 作为属性传递给子组件

而子组件是无法知道自己接受到的属性是来自哪里的。

所以将这种数据流称为单向数据流

# 事件处理

react 的事件和 dom 元素的事件相似，但是它们又有所不同

1. react 的事件名称都采用小驼峰，而不是单纯的小写

2. 使用 JSX 语法时，你需要传入一个函数作为事件处理函数，而不是一个字符串

传统的 HTML

```
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

React

```
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault 。例如，传统的 HTML 中阻止链接默认打开一个新页面，你可以这样写：

```
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

在 React 中，可能是这样的：

```
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

e 是一个合成事件，你不需要担心跨浏览器的兼容性问题

```
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

// 事件处理函数的定义
  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

在 class 组件中，通常将事件处理函数声明为 class 中的一个方法

你必须谨慎对待 JSX 回调函数中的 this，在 JavaScript 中，class 的方法默认不会绑定 this。如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined。

这并不是 React 特有的行为；这其实与 JavaScript 函数工作原理有关。通常情况下，如果你没有在方法后面添加 ()，例如 onClick={this.handleClick}，你应该为这个方法绑定 this。

如果你不想使用 bind，那么你可以有两种方式来解决 this 绑定的问题

1. 使用箭头函数定义事件处理函数

```
handleClick = () => {
    console.log('this is:', this);
  }
      <button onClick={this.handleClick}>
        Click me
      </button>

```

2. 在事件绑定的时候进行处理

```
  handleClick() {
    console.log('this is:', this);
  }
<button onClick={() => this.handleClick()}>
        Click me
      </button>
```

此语法问题在于每次渲染 LoggingButton 时都会创建不同的回调函数。在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在构造器中绑定或使用 方法一 语法来避免这类性能问题。

- 向事件处理程序传递参数

在循环中，通常我们会为事件处理函数传递额外的参数。例如，若 id 是你要删除那一行的 ID，以下两种方式都可以向事件处理函数传递参数：

```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

上述两种方式是等价的，分别通过箭头函数和 Function.prototype.bind 来实现。

在这两种情况下，React 的事件对象 e 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递

# 条件渲染

- if 判断

- 三元表达式

- && 运算符

```
<div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
```

如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。

请注意，返回 false 的表达式会使 && 后面的元素被跳过，但会返回 false 表达式。在下面示例中，render 方法的返回值是 <div>0</div>。

```
render() {
  const count = 0;
  return (
    <div>
      { count && <h1>Messages: {count}</h1>}
    </div>
  );
}
```

- 阻止组件渲染

有时候，你需要隐藏一个组件，这个时候可以给 render 方法返回 `null` 就可以不进行任何渲染

**在组件的 render 方法中返回 null 并不会影响组件的生命周期**

# 列表 & key

- 渲染多个组件

```
<ul>
          {this.state.list.map(i => (
            <li key={i}>{i}</li>
          ))}
        </ul>
```

- key（相当于一个唯一的标识）所以一般使用元素的 id 来作为 key，万不得已时再使用数组的 index

key 帮助 React 识别哪些元素发生了变化，比如被添加和删除

如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。

- 用 key 提取组件

元素的 key 只有放在**就近的数组上下文**中才有意义。

比方说，如果你提取出一个 ListItem 组件，你应该把 key 保留在数组中的这个 <ListItem /> 元素上，而不是放在 ListItem 组件中的 <li> 元素上。

**一个好的经验法则是：在 map() 方法中的元素需要设置 key 属性。**

- key 在兄弟节点直接必须唯一

数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值

key 会传递信息给 React ，但不会传递给你的组件。如果你的组件中需要使用 key 属性的值，请用其他属性名显式传递这个值：

```
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

上面例子中，Post 组件可以读出 props.id，但是不能读出 props.key。

# 表单

- 受控组件

让 React 的 state 成为表单唯一的数据源，渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。

```
<input type="text" value={this.state.value} onChange={this.handleChange} />
```

如果我们不为该组件绑定 onChange 事件的话，此时我们在输入框中输入内容会发现，输入框中的值不会发生变化。

我们需要绑定 onChange 事件来对 this.state.value 重新赋值来改变输入框中的内容

```
  handleChange(event) {
    this.setState({value: event.target.value});
  }
```

由于在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value，这使得 React 的 state 成为唯一数据源。由于 handlechange 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新。

- select 标签

HTML 中

```
<select>
  <option value="grapefruit">葡萄柚</option>
  <option value="lime">酸橙</option>
  <option selected value="coconut">椰子</option>
  <option value="mango">芒果</option>
</select>
```

由于 selected 属性的缘故，椰子选项默认被选中。React 并不会使用 selected 属性，而是在根 select 标签上使用 value 属性。

React 中

```
<select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>

handleChange(event) {
    this.setState({value: event.target.value});
  }

```

总的来说，这使得 <input type="text">, <textarea> 和 <select> 之类的标签都非常相似—它们都接受一个 value 属性，你可以使用它来实现受控组件。

> 你可以将数组传递到 value 属性中，以支持在 select 标签中选择多个选项：
> <select multiple={true} value={['B', 'C']}>

- 文件 input 标签

input 的 type 为 file

- 多个输入

- 受控组件的 value 为空值（null/undefined）

因为对于受控组件，我们制定了 value 的值的时候，用户是不能修改它的值的，除非我们设置了 onChange 事件去改变 state 的值，但是如果 value 的值是 null/undefined 的话，那么用户是可以随意输入（可编辑）的。

# 状态提升

多个组件使用相同的数据的时候，我们推荐将这个状态提升到父组件中，子组件通过 props 来拿到父组件的 state 来渲染，父组件也可以通过 props 来传递一个方法给子组件，用于在子组件内部修改了这个 props 时，调用父组件传递过来的方法，将修改的新值传递给父组件来让父组件更新状态=》子组件中的值发生变化。

# 组合 vs 继承

我们推荐使用组合而非继承来实现组件的代码复用

<FancyBorder> JSX 标签中的所有内容都会作为一个 children prop 传递给 FancyBorder 组件。因为 FancyBorder 将 {props.children} 渲染在一个 <div> 中，被传递的这些子组件最终都会出现在输出结果中。

有时候我们需要在组件中预留出好几个位置，我们可以通过给组件传递的属性为**组件**来实现该功能，在我们预留的位置那里通过{props.xxx}来使用该组件

这种方法可能使你想起别的库中“槽”（slot）的概念，但在 React 中没有“槽”这一概念的限制，你可以将任何东西作为 props 进行传递。

作为 props 传递的组件或者 HTML 的事件处理都是在定义它的组件里，而不是最后接收它的组件里。

# React 哲学

state 和 props 之间的区别是什么？

props（“properties” 的缩写）和 state 都是普通的 JavaScript 对象。它们都是用来保存信息的，这些信息可以控制组件的渲染输出，而它们的一个重要的不同点就是：props 是传递给组件的（类似于函数的形参），而 state 是在组件内被组件自己管理的（类似于在一个函数内声明的变量）。
