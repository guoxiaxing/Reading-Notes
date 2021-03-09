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
        <h1>Date is {this.state.date.toLocaleTimeString()} !</h1>{" "}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [1, 2, 3, 4, 5]
    };
  }
  render() {
    return (
      <div className="App">
        {/* <Clock /> */}
        <ul>
          {this.state.list.map(i => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
