import Navbar from "../../Components/Navbar/Navbar";
import ShowTasks from "../../Components/ShowTasks/ShowTasks";

export default function ViewAllTask() {
  return (
   
      <>
        <Navbar buttonName="Add Task" />
        <ShowTasks />
      </>
   
  );
}
