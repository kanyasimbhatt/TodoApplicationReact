import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useEffect } from "react";
import useTask from "../TaskProvider";
import "./AddEditForm.css";
import { Task } from "../../Types/Tasks/types";

const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  status: z.enum(["Todo", "In Progress", "Done"]),
});

type FormFields = z.infer<typeof schema>;

type TaskId = {
  taskId: string;
};

export const AddEditForm: React.FC<TaskId> = ({ taskId }) => {
  const navigate = useNavigate();
  const { tasks, setTasks } = useTask();
  const taskIndex = tasks.findIndex((task: Task) => task.id === taskId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    let allTasks = tasks;
    if (taskId) {
      allTasks[taskIndex] = { ...data, id: taskId };
    } else {
      const id = crypto.randomUUID();
      allTasks = [...allTasks, { ...data, id: id }];
    }
    setTasks(allTasks);
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("tasks-array", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <form className="add-edit-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">
          {taskId === "" ? `Add Task` : `Edit Task`}
        </h2>

        <label>
          {" "}
          <b>Enter Title: </b>
          <br />
          <input
            {...register("title")}
            type="text"
            className="title input-tag"
            placeholder="Enter title"
            defaultValue={taskId ? tasks[taskIndex].title : ""}
          />
          {errors.title && (
            <div className="error-message">{errors.title.message}</div>
          )}
        </label>

        <label>
          {" "}
          <b> Enter Description:</b>
          <br />
          <input
            {...register("description")}
            type="text"
            className="description input-tag"
            defaultValue={taskId ? tasks[taskIndex].description : ""}
            placeholder="Enter Description"
          />
          {errors.description && (
            <div className="error-message">{errors.description.message}</div>
          )}
        </label>
        <label>
          <b>Select Status: </b>
          <br />
          <select
            {...register("status")}
            className="status-select input-tag"
            defaultValue={taskId ? tasks[taskIndex].status : "Todo"}
          >
            <option value={"Todo"}>Todo</option>

            {taskId === "" ? (
              <option value={"In Progress"} disabled>
                In Progress
              </option>
            ) : (
              <option value={"In Progress"}>In Progress</option>
            )}
            {taskId === "" ? (
              <option value={"Done"} disabled>
                Done
              </option>
            ) : (
              <option value={"Done"}>Done</option>
            )}
          </select>
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : taskId === "" ? "Add" : "Edit"}
        </button>
        {errors.root && (
          <div className="error-message">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
};
