import Navbar from "../Navbar/Navbar";
import ShowTasks from "../ShowTasks/ShowTasks";

export default function ViewAllTask() {
  return (
    <>
      <Navbar buttonName="Add Task" />
      <ShowTasks />
    </>
  );
}
