import { useState } from "react";
import { Task } from "../Components/ShowTasks/ShowTasks";
import { TaskContext } from "./TaskContext";

type ChildrenType = {
  children: React.ReactNode;
};

export default function TaskProvider({ children }: ChildrenType) {
  if (!localStorage.getItem("tasks-array")) {
    localStorage.setItem("tasks-array", JSON.stringify([]));
  }
  const [task, setTask] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks-array") as string)
  );
  return (
    <div>
      <TaskContext.Provider value={{ task, setTask }}>
        {children}
      </TaskContext.Provider>
    </div>
  );
}
