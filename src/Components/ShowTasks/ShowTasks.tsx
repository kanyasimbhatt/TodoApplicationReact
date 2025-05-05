import "./showTasks.css";
import { useGlobalContext } from "../viewAllTasks/ViewAllTasks";
import React from "react";
import { useNavigate } from "react-router-dom";
import FilterTask from "../FilterTasks/FilterTask";
import { useForm } from "react-hook-form";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export type FilterElement = {
  searchByTitle: string;
  searchByDescription: string;
  searchByBoth: string;
  filterStatus: string;
};

export default function ShowTasks() {
  const { task, setTask } = useGlobalContext();
  const { register, watch } = useForm<FilterElement>({
    defaultValues: {
      searchByTitle: "",
      searchByDescription: "",
      searchByBoth: "",
      filterStatus: "",
    },
  });
  const filterContent = watch();
  const navigate = useNavigate();

  const filteredTasks = task.filter((t: Task) => {
    const searchedTitle = filterContent.searchByTitle
      ? t.title
          .toLowerCase()
          .includes(filterContent.searchByTitle.toLowerCase())
      : true;

    const searchedDescription = filterContent.searchByDescription
      ? t.description
          .toLowerCase()
          .includes(filterContent.searchByDescription.toLowerCase())
      : true;

    const searchedBoth = filterContent.searchByBoth
      ? t.description
          .toLowerCase()
          .includes(filterContent.searchByDescription.toLowerCase()) &&
        t.title.toLowerCase().includes(filterContent.searchByBoth.toLowerCase())
      : true;

    const searchByStatus = filterContent.filterStatus
      ? t.status === filterContent.filterStatus
      : true;

    return (
      searchedTitle && searchedDescription && searchedBoth && searchByStatus
    );
  });

  function handleTaskEdit(event: React.MouseEvent) {
    if ("id" in event.target) {
      navigate(`/add-task/${event.target!.id}`);
    }
  }

  function handleTaskDelete(event: React.MouseEvent) {
    const newFilteredArray = task.filter((t: Task) => {
      if ("id" in event.target && t.id !== event.target.id) {
        return true;
      }
      return false;
    });

    localStorage.setItem("tasks-array", JSON.stringify(newFilteredArray));
    setTask(newFilteredArray);
  }

  function handleChangeOnStatus(event: React.ChangeEvent) {
    const newTasksArray = task.map((t: Task) => {
      if (t.id === event.target.id && "value" in event.target) {
        t.status = event.target.value as string;
      }
      return t;
    });

    localStorage.setItem("tasks-array", JSON.stringify(newTasksArray));
    setTask(newTasksArray);
  }

  const statusOptions = ["Done", "In Progress", "Todo"];
  return (
    <>
      <FilterTask register={register} />
      <div className="show-task">
        {filteredTasks.length === 0 ? (
          <div className="header-wrapper">
            {" "}
            <h3>No Tasks yet!</h3>
          </div>
        ) : (
          <></>
        )}
        {filteredTasks.map((task: Task) => (
          <div className={`card-wrapper ${task.status}`} key={task.id}>
            <div className="tasks-title">{task.title}</div>
            <div className="tasks-description">{task.description}</div>
            <select
              id={task.id}
              className="options-select"
              value={task.status}
              onChange={handleChangeOnStatus}
            >
              <option disabled>{task.status}</option>
              <option>
                {statusOptions[0] === task.status
                  ? statusOptions[1]
                  : statusOptions[0]}
              </option>
              <option>
                {statusOptions[2] === task.status
                  ? statusOptions[1]
                  : statusOptions[2]}
              </option>
            </select>
            <div className="edit-delete-button">
              <button
                className="edit-button"
                id={`${task.id}`}
                onClick={handleTaskEdit}
              >
                Edit
              </button>
              <button
                className="edit-button"
                id={`${task.id}`}
                onClick={handleTaskDelete}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
