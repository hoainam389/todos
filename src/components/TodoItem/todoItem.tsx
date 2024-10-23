import "./todoItem.scss";
import { memo, useCallback, useState } from "react";
import { useTodoStore } from "../../store/todoStore";
import { TodoItemProps } from "./todoItem.type";
import Input from "../Input/input";

const TodoItem = memo(function TodoItem({
  id,
  label,
  completed,
}: TodoItemProps) {
  console.log("TodoItem re-render");
  const [editting, setEditting] = useState(false);
  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const removeTodo = useTodoStore((s) => s.removeTodo);
  const updateTodo = useTodoStore((s) => s.updateTodo);

  const handleDoubleClick = useCallback(() => {
    setEditting(true);
  }, []);

  const handleBlur = useCallback(() => {
    setEditting(false);
  }, []);

  const handleUpdate = useCallback(
    (label: string) => {
      updateTodo(id, label);
      setEditting(false);
    },
    [id, updateTodo]
  );

  return (
    <li className="todo-item">
      {editting ? (
        <Input
          onSubmit={handleUpdate}
          defaultValue={label}
          onBlur={handleBlur}
        />
      ) : (
        <>
          <input
            type="checkbox"
            defaultChecked={completed}
            onClick={() => toggleTodo(id)}
          ></input>
          <span
            className={completed ? "completed" : ""}
            onDoubleClick={handleDoubleClick}
          >
            {label}
          </span>
          <button onClick={() => removeTodo(id)}>Remove</button>
        </>
      )}
    </li>
  );
});

export default TodoItem;
