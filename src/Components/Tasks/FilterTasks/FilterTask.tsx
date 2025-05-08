import { UseFormRegister } from "react-hook-form";
import "./FilterTask.css";
import { FilterElement } from "../types/TaskType/types";

export default function FilterTask({
  register,
}: {
  register: UseFormRegister<FilterElement>;
}) {
  return (
    <>
      <div className="filter-section">
        <input
          type="text"
          {...register("searchByTitle")}
          id="input"
          placeholder="Search By Title"
        />
        <input
          type="text"
          {...register("searchByDescription")}
          id="input"
          placeholder="Search By Description"
        />
        <input
          type="text"
          id="input"
          {...register("searchByBoth")}
          placeholder="Search By Title and Description"
        />
        <label className="status-filter">
          Filter By Status:
          <select {...register("filterStatus")} id="input">
            <option value={""}>All Task</option>
            <option value={`Todo`}>Todo</option>
            <option value={`In Progress`}>In Progress</option>
            <option value={`Done`}>Done</option>
          </select>
        </label>
      </div>
    </>
  );
}
