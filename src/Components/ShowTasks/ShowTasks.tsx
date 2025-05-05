import "./showTasks.css";
import { useGlobalContext } from "../viewAllTasks/ViewAllTasks";
import React from "react";
import { useNavigate } from "react-router-dom";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export default function ShowTasks() {
  const { task, setTask } = useGlobalContext();
  const navigate = useNavigate();

  function handleTaskEdit(event: React.MouseEvent) {
    if ("id" in event.target) {
      navigate(`/add-task/${event.target!.id}`);
    }
  }

  function handleTaskDelete(event: React.MouseEvent) {
    console.log(event);
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
    <div className="show-task">
      {task.length === 0 ? (
        <div className="header-wrapper">
          {" "}
          <h3>No Tasks Added yet!</h3>
        </div>
      ) : (
        <></>
      )}
      {task.map((task: Task) => (
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
  );
}
