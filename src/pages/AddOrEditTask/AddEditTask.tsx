import Navbar from "../../Components/Navbar/Navbar";
import AddEditForm from "../../Components/AddOrEditTask/AddEditForm";
import { useParams } from "react-router-dom";

export default function AddEditTask() {
  const { id } = useParams();
  return (
    <div>
      <Navbar buttonName={"View All Task"} />
      <AddEditForm taskId={id ?? ""} />
    </div>
  );
}
