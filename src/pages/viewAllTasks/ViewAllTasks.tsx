import Navbar from "../../Components/Navbar/Navbar";
import ShowTasks from "../../Components/ShowTasks/ShowTasks";
import TaskProvider from "../../context/TaskContext/TaskProvider";

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
