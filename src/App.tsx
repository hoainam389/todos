import "./App.css";
import Input from "./components/Input/input";
import TodoList from "./components/TodoList/todoList";
import { useTodoStore } from "./store/todoStore";

function App() {
  const addTodo = useTodoStore((s) => s.addTodo);

  return (
    <>
      <h1>todos</h1>
      <Input placeholder="What will never be done?" onSubmit={addTodo} />
      <TodoList />
      <h4>Double-click to edit a todo - Nam Nguyen</h4>
    </>
  );
}

export default App;
