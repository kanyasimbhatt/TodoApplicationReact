import Navbar from "../Navbar/Navbar";
import ShowTasks from "../ShowTasks/ShowTasks";

export default function ViewAllTask() {
  return (
    <div>
      <Navbar buttonName="Add Task" />
      <ShowTasks />
    </div>
  );
}
