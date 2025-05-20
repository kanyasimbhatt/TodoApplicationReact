import { UseFormRegister } from "react-hook-form";
import "./FilterTask.css";
import { FilterElement } from "../../Types/Tasks/types";
import { useDarkMode } from "../Navbar/DarkModeProvider";

type RegisterType = {
  register: UseFormRegister<FilterElement>;
};

export const FilterTask: React.FC<RegisterType> = ({ register }) => {
  const { darkMode } = useDarkMode();
  return (
    <div className="filter-section">
      <input
        type="text"
        {...register("searchByTitle")}
        id={darkMode ? "input" : "input-light"}
        placeholder="Search By Title"
      />
      <input
        type="text"
        {...register("searchByDescription")}
        id={darkMode ? "input" : "input-light"}
        placeholder="Search By Description"
      />
      <input
        type="text"
        id={darkMode ? "input" : "input-light"}
        {...register("searchByBoth")}
        placeholder="Search By Title and Description"
      />
      <label className="status-filter">
        Filter By Status:
        <select
          {...register("filterStatus")}
          id={darkMode ? "input" : "input-light"}
        >
          <option value={""}>All Task</option>
          <option value={`Todo`}>Todo</option>
          <option value={`In Progress`}>In Progress</option>
          <option value={`Done`}>Done</option>
        </select>
      </label>
    </div>
  );
};
