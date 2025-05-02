import "./showTasks.css";
import { useGlobalContext } from "../viewAllTasks/ViewAllTasks";
import React from "react";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export default function ShowTasks() {
  const { task } = useGlobalContext();

  function handleTaskEdit(event: React.MouseEvent) {
    console.log(event);
  }

  function handleTaskDelete(event: React.MouseEvent) {
    console.log(event);
  }

  function handleChangeOnStatus(event: React.ChangeEvent) {
    console.log(event);
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
            className="options-select"
            value={"Todo"}
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
