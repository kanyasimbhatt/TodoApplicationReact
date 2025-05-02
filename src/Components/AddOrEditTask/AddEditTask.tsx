import Navbar from "../Navbar/Navbar";
import AddEditForm from "./AddEditForm";

export default function AddEditTask() {
  return (
    <div>
      <Navbar buttonName={"View All Task"} />
      <AddEditForm />
    </div>
  );
}
