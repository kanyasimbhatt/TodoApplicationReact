import { useGlobalContext } from "../viewAllTasks/ViewAllTasks";
import "./FilterTask.css";

export default function FilterTask() {
  const { task } = useGlobalContext();
  function handleSearchByTitle(event: React.ChangeEvent) {
    console.log(event);
    console.log(task);
  }

  function handleSearchByDescription(event: React.ChangeEvent) {
    console.log(event);
  }

  function handleSearchByBoth(event: React.ChangeEvent) {
    console.log(event);
  }

  function handleFilterByStatus(event: React.ChangeEvent) {
    console.log(event);
  }
  return (
    <>
      <div className="filter-section">
        <input
          type="text"
          id="input"
          onChange={handleSearchByTitle}
          placeholder="Search By Title"
        />
        <input
          type="text"
          id="input"
          onChange={handleSearchByDescription}
          placeholder="Search By Description"
        />
        <input
          type="text"
          id="input"
          onChange={handleSearchByBoth}
          placeholder="Search By Title and Description"
        />
        <label className="status-filter">
          Filter By Status:
          <select
            value={`All Tasks`}
            id="input"
            onChange={handleFilterByStatus}
          >
            <option value={`Todo`}>Todo</option>
            <option value={`In Progress`}>In Progress</option>
            <option value={`Done`}>Done</option>
          </select>
        </label>
      </div>
    </>
  );
}
