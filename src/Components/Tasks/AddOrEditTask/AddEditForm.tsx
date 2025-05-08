import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useEffect } from "react";
import { useTask } from "../TaskProvider";
import "./AddEditForm.css";
import { Task } from "../../Types/Tasks/types";

type TaskStatusType = "Todo" | "In Progress" | "Done";

const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  status: z.enum(["Todo", "In Progress", "Done"]),
});

type TaskFormFields = z.infer<typeof schema>;

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
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<TaskFormFields> = (data) => {
    let allTasks = [...tasks];
    if (taskId) {
      allTasks[taskIndex] = { ...data, id: taskId };
    } else {
      const id = crypto.randomUUID();
      allTasks = [...allTasks, { ...data, id: id }];
    }
    localStorage.setItem("tasks-array", JSON.stringify(allTasks));
    setTasks(allTasks);
    navigate("/");
  };

  useEffect(() => {
    if (taskId)
      reset({
        title: tasks[taskIndex].title,
        description: tasks[taskIndex].description,
        status: tasks[taskIndex].status as TaskStatusType,
      });
  }, []);

  return (
    <form className="add-edit-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-title">{taskId === "" ? `Add Task` : `Edit Task`}</h2>

      <label>
        <b>Enter Title: </b>
        <br />
        <input
          {...register("title")}
          type="text"
          className="title input-tag"
          placeholder="Enter title"
        />
      </label>

      <label>
        <b> Enter Description:</b>
        <br />
        <input
          {...register("description")}
          type="text"
          className="description input-tag"
          placeholder="Enter Description"
        />
        {errors.description && (
          <div className="error-message">{errors.description.message}</div>
        )}
      </label>
      <label>
        <b>Select Status: </b>
        <br />
        <select {...register("status")} className="status-select input-tag">
          <option value={"Todo"}>Todo</option>

          <option value={"In Progress"} disabled={!taskId}>
            In Progress
          </option>

          <option value={"Done"} disabled={!taskId}>
            Done
          </option>
        </select>
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : taskId === "" ? "Add" : "Edit"}
      </button>
      {errors.root && (
        <div className="error-message">{errors.root.message}</div>
      )}
    </form>
  );
};
