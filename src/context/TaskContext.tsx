import { Task } from "../types/types";
import { createContext } from "react";
export type TasksArrayType = {
  tasks: Task[];
  setTasks: (c: Task[]) => void;
};

export const TaskContext = createContext<TasksArrayType>({
  tasks: [],
  setTasks: () => {},
});
