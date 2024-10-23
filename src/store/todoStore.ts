import { create } from "zustand";
import { TodoItemProps } from "../components/TodoList/todoList.type";
import { persist } from "zustand/middleware";

interface TodoState {
  todos: TodoItemProps[];
  addTodo: (label: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, label: string) => void;
  completeAll: () => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (label) =>
        set((state) => ({
          todos: [...state.todos, { id: crypto.randomUUID(), label: label }],
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((item) => item.id !== id),
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((item) => {
            return item.id === id
              ? { ...item, completed: !item.completed }
              : item;
          }),
        })),
        updateTodo: (id, label) =>
        set((state) => ({
          todos: state.todos.map((item) => {
            return item.id === id ? { ...item, label: label } : item;
          }),
        })),
      completeAll: () =>
        set((state) => ({
          todos: state.todos.map((item) => {
            return !item.completed ? { ...item, completed: true } : item;
          }),
        })),
      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((item) => !item.completed),
        })),
    }),
    {
      name: "todos-storage",
    }
  )
);
