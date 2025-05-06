import { Task } from "../../types/TaskType/types";
import { createContext, useContext } from "react";
export type TasksArrayType = {
  tasks: Task[];
  setTasks: (c: Task[]) => void;
};

export const TaskContext = createContext<TasksArrayType>({
  tasks: [],
  setTasks: () => {},
});

export default function useTask() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
