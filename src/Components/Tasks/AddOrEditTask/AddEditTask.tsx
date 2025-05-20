import { Navbar } from "../Navbar/Navbar";
import { AddEditForm } from "./AddEditForm";
import { TaskProvider } from "../TaskProvider";
import "./AddEditForm.css";

export const AddEditTaskWrapper: React.FC = () => {
  return (
    <TaskProvider>
      <AddEditTask />
    </TaskProvider>
  );
};

const AddEditTask: React.FC = () => {
  return (
    <>
      <Navbar buttonName={"View All Task"} />
      <div className="add-edit-form-wrapper">
        <AddEditForm />
      </div>
    </>
  );
};
