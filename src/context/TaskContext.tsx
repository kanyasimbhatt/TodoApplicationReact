import { Task } from "../Components/ShowTasks/ShowTasks";
import { createContext } from "react";
export type TasksArrayType = {
  task: Task[];
  setTask: (c: Task[]) => void;
};

export const TaskContext = createContext<TasksArrayType>({
  task: [],
  setTask: () => {},
});
