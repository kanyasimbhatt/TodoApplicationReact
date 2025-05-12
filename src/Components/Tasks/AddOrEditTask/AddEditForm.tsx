import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
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

const defaultIdType = {
  taskId: "",
};

export const AddEditForm: React.FC = () => {
  const { taskId } = useParams() || defaultIdType;
  const navigate = useNavigate();
  const { tasks, setTasks } = useTask();
  const taskData = tasks.find((task: Task) => task.id === taskId);
  const taskIndex = tasks.findIndex((task: Task) => task.id === taskId);
  const defaultValue = {
    title: "",
    description: "",
    status: "Todo" as TaskStatusType,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormFields>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: defaultValue,
  });

  const onSubmit: SubmitHandler<TaskFormFields> = (data) => {
    let allTasks = [...tasks];
    if (taskData) {
      allTasks[taskIndex] = { ...allTasks[taskIndex], ...data };
    } else {
      const id = crypto.randomUUID();
      allTasks = [...allTasks, { ...data, id }];
    }
    localStorage.setItem("tasks-array", JSON.stringify(allTasks));
    setTasks(allTasks);
    navigate("/");
  };

  useEffect(() => {
    if (taskData)
      reset({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status as TaskStatusType,
      });
  }, []);

  return (
    <form className="add-edit-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-title">{!taskData ? `Add Task` : `Edit Task`}</h2>

      <label>
        <b>Enter Title: </b>
        <br />
        <input
          {...register("title")}
          type="text"
          className="title input-tag"
          placeholder="Enter title"
        />
        {errors.title && (
          <div className="error-message">{errors.title.message}</div>
        )}
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

          <option value={"In Progress"} disabled={!taskData}>
            In Progress
          </option>

          <option value={"Done"} disabled={!taskData}>
            Done
          </option>
        </select>
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : !taskData ? "Add" : "Edit"}
      </button>
      {errors.root && (
        <div className="error-message">{errors.root.message}</div>
      )}
    </form>
  );
};
