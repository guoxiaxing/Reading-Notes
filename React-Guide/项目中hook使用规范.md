# 项目中使用 hook 的规范

- 如果一个函数被作为组件的属性传递，此时该函数需要使用 useCallback 进行包裹，且依赖于某一些值的话

类型定义

BookContentComponentProps ---- 用于定义传入的 props 的类型

```
const BookContentComponent: FC<BookContentComponentProps> = ({
  book,
  handleSuccess,
}) => {
};
```

## useMemo 使用场景

- 有些计算开销很大，我们就需要「记住」它的返回值，避免每次 render 都去重新计算。

1. 传递给 useMemo 的函数的开销大不大

2. 当输入相同时，「记忆」值的引用是否会发生改变，也就是传递给 useMemo 的函数的返回值会不会在输入值相同的时候发生变化（如果返回的是一个引用值，那么该引用值返回的对象是不是每一次都是一个新的对象；如果返回的是一个原始值，那么输入相同的时候自然输出也是相同的）

因此，如果函数开销不大且返回的是一个原始值，那么我们完全可以去掉 useMemo

**如果只是想在重新渲染时保持值的引用不变，更好的方法是使用 useRef，而不是 useMemo。但其实并不是**

虽然在 React 中 useRef 和 useMemo 的实现有一点差别，但是当 useMemo 的依赖数组为空数组时，它和 useRef 的开销可以说相差无几。useRef 甚至可以直接用 useMemo 来实现，就像下面这样：

```
const useRef = (v) => {
  return useMemo(() => ({current: v}), []);
};
```

- 由于值的引用发生变化，导致下游组件重新渲染，我们也需要「记住」这个值。

- 记忆的值会被其他 Hook 或者子组件用到吗

### 使用场景

#### 保持引用相等

1. 对于组件内部用到的 object、array、函数等，如果用在了其他 Hook 的依赖数组中，或者作为 props 传递给了下游组件，应该使用 useMemo。

2. 自定义 Hook 中暴露出来的 object、array、函数等，都应该使用 useMemo 。以确保当值相同时，引用不发生变化。

3. 使用 Context 时，如果 Provider 的 value 中定义的值（第一层）发生了变化，即便用了 Pure Component 或者 React.memo，仍然会导致子组件 re-render。这种情况下，仍然建议使用 useMemo 保持引用的一致性。

#### 成本很高的计算

比如 cloneDeep 一个很大并且层级很深的数据

### 无需使用 useMemo 的场景

1. 如果返回的值是原始值： string, boolean, null, undefined, number, symbol（不包括动态声明的 Symbol），一般不需要使用 useMemo。

2. 仅在组件内部用到的 object、array、函数等（没有作为 props 传递给子组件），且没有用到其他 Hook 的依赖数组中，一般不需要使用 useMemo。

## 自定义 hook

注意事项

在编写自定义 Hook 时，**返回值一定要保持引用的一致性**。因为你无法确定外部要如何使用它的返回值。如果返回值被用做其他 Hook 的依赖，并且每次 re-render 时引用不一致（当值相等的情况），就可能会产生 bug。

# 使用 hook 的好的实践

1. 若 Hook 类型相同，且依赖数组一致时，应该合并成一个 Hook。否则会产生更多开销。

2. 参考原生 Hooks 的设计，自定义 Hooks 的返回值可以使用 Tuple 类型，更易于在外部重命名。但如果返回值的数量超过三个，还是建议返回一个对象。

3. ref 不要直接暴露给外部使用，而是提供一个修改值的方法。

4. 在使用 useMemo 或者 useCallback 时，确保返回的函数只创建一次(前提是返回的值是函数的时候)。也就是说，函数不会根据依赖数组的变化而二次创建。可以借助 ref 或者 setState callback，确保返回的函数只创建一次。
