import AddEditTask from "../AddOrEditTask/AddEditTask";
import Navbar from "../Navbar/Navbar";
import ShowTasks from "../ShowTasks/ShowTasks";

export default function ViewAllTask() {
  return (
    <div>
      <Navbar />
      <AddEditTask />
      <ShowTasks />
    </div>
  );
}
