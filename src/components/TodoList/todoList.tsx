import "./todoList.scss";
import { useMemo, useState } from "react";
import { useTodoStore } from "../../store/todoStore";
import TodoItem from "../TodoItem/todoItem";
import { Filter } from "./todoList.type";
import { useShallow } from "zustand/shallow";

const TodoList = () => {
  console.log("TodoList re-render");

  const completeAll = useTodoStore((s) => s.completeAll);
  const clearCompleted = useTodoStore((s) => s.clearCompleted);
  const todos = useTodoStore(useShallow((s) => s.todos));
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const filteredTodos = useMemo(() => {
    return filter === Filter.Active
      ? todos.filter((todo) => !todo.completed)
      : filter === Filter.Completed
      ? todos.filter((todo) => todo.completed)
      : todos;
  }, [filter, todos]);

  const incompletedCount = todos.filter((todo) => !todo.completed).length;

  if (!todos || todos.length < 1) return <></>;

  return (
    <section className="todo-list__container">
      <div className="todo-list__action">
        <h4>Actions</h4>
        <ul>
          <li>
            <button onClick={completeAll}>Complete all todos!</button>
          </li>
          <li>
            <button onClick={clearCompleted}>Clear completed todos!</button>
          </li>
        </ul>
      </div>
      <div className="todo-list__action">
        <h4>Filters</h4>
        <ul>
          <li>
            <button
              className={filter === Filter.All ? "active" : ""}
              onClick={() => setFilter(Filter.All)}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={filter === Filter.Active ? "active" : ""}
              onClick={() => setFilter(Filter.Active)}
            >
              Active
            </button>
          </li>
          <li>
            <button
              className={filter === Filter.Completed ? "active" : ""}
              onClick={() => setFilter(Filter.Completed)}
            >
              Completed
            </button>
          </li>
        </ul>
      </div>
      <div className="todo-list__counter">
        <h4>{incompletedCount} todos left!</h4>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </ul>
    </section>
  );
  // Your code end here
};

export default TodoList;
