import { useState } from "react";
import { Task } from "../../types/TaskType/types";
import { createContext, useContext } from "react";

export type TasksArrayType = {
  tasks: Task[];
  setTasks: (c: Task[]) => void;
};
const TaskContext = createContext<TasksArrayType>({
  tasks: [],
  setTasks: () => {},
});

type ChildrenType = {
  children: React.ReactNode;
};

export function TaskProvider({ children }: ChildrenType) {
  if (!localStorage.getItem("tasks-array")) {
    localStorage.setItem("tasks-array", JSON.stringify([]));
  }
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks-array") as string),
  );
  return (
    <div>
      <TaskContext.Provider value={{ tasks, setTasks }}>
        {children}
      </TaskContext.Provider>
    </div>
  );
}

export default function useTask() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
