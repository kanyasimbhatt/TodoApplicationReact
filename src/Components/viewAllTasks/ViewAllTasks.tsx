import { useState } from "react";
import AddEditTask from "../AddOrEditTask/AddEditTask";
import Navbar from "../Navbar/Navbar";
import ShowTasks from "../ShowTasks/ShowTasks";
import { createContext, useContext } from "react";
import { Task } from "../ShowTasks/ShowTasks";

export type TasksArrayType = {
  task: Task[];
  setTask: (c: Task[]) => void;
};

const TaskContext = createContext<TasksArrayType>({
  task: [
    {
      id: "",
      title: "",
      description: "",
      status: "",
    },
  ],
  setTask: () => {},
});
export const useGlobalContext = () => useContext(TaskContext);

export default function ViewAllTask() {
  if (!localStorage.getItem("tasks-array")) {
    localStorage.setItem("tasks-array", JSON.stringify([]));
  }
  const [task, setTask] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks-array") as string)
  );
  return (
    <div>
      <TaskContext.Provider value={{ task, setTask }}>
        <Navbar />
        <AddEditTask />
        <ShowTasks />
      </TaskContext.Provider>
    </div>
  );
}
