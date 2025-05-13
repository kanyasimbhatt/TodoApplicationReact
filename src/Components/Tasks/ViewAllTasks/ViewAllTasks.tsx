import { Navbar } from "../Navbar/Navbar";
import { ShowTasks } from "../ShowTasks/ShowTasks";
import { TaskProvider } from "../TaskProvider";

export const ViewAllTaskWrapper: React.FC = () => {
  return (
    <TaskProvider>
      <ViewAllTask />
    </TaskProvider>
  );
};

const ViewAllTask: React.FC = () => {
  return (
    <>
      <Navbar buttonName="Add Task" />
      <ShowTasks />
    </>
  );
};
