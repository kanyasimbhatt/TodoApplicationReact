import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import AddEditForm from "./AddEditForm";

export default function AddEditTask() {
  const { id } = useParams();
  return (
    <div>
      <Navbar buttonName={"View All Task"} />
      <AddEditForm taskId={id ?? ""} />
    </div>
  );
}
