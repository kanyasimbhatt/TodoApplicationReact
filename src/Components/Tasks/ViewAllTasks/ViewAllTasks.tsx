import { Navbar } from "../Navbar/Navbar";
import { ShowTasks } from "../ShowTasks/ShowTasks";

export const ViewAllTask: React.FC = () => {
  return (
    <>
      <Navbar buttonName="Add Task" />
      <ShowTasks />
    </>
  );
};
