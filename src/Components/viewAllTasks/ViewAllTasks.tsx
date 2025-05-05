import Navbar from "../Navbar/Navbar";
import ShowTasks from "../ShowTasks/ShowTasks";
import TaskProvider from "../../context/TaskProvider";

export default function ViewAllTask() {
  return (
    <TaskProvider>
      <>
        <Navbar buttonName="Add Task" />
        <ShowTasks />
      </>
    </TaskProvider>
  );
}
