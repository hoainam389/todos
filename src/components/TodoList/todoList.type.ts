export enum Filter {
  All = "all",
  Active = "active",
  Completed = "completed",
}

export interface TodoItemProps {
  id: string;
  label: string;
  completed?: boolean;
  editing?: boolean;
}