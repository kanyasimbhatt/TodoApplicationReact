import { Task } from "../Components/ShowTasks/ShowTasks";
import { createContext } from "react";
export type TasksArrayType = {
  tasks: Task[];
  setTasks: (c: Task[]) => void;
};

export const TaskContext = createContext<TasksArrayType>({
  tasks: [],
  setTasks: () => {},
});
