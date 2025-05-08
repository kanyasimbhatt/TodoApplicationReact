import { useParams } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { AddEditForm } from "./AddEditForm";
import { TaskProvider } from "../TaskProvider";

export const AddEditTaskWrapper: React.FC = () => {
  return (
    <TaskProvider>
      <AddEditTask />
    </TaskProvider>
  );
};

const AddEditTask: React.FC = () => {
  const { id } = useParams();
  return (
    <TaskProvider>
      <Navbar buttonName={"View All Task"} />
      <AddEditForm taskId={id ?? ""} />
    </TaskProvider>
  );
};
