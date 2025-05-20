import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useEffect } from "react";
import { useTask } from "../TaskProvider";
import "./AddEditForm.css";
import { Task } from "../../Types/Tasks/types";
import { TodoStatus } from "../../Types/Tasks/types";
import { useDarkMode } from "../Navbar/DarkModeProvider";

const schema = z.object({
  id: z.string(),
  title: z.string().min(5),
  description: z.string().min(10),
  status: z.enum([TodoStatus.TODO, TodoStatus.INPROGRESS, TodoStatus.DONE]),
});

type TaskFormFields = z.infer<typeof schema>;

export const AddEditForm: React.FC = () => {
  const { taskId } = useParams();
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const { tasks, setTasks } = useTask();
  const taskData = tasks.find((task: Task) => task.id === taskId);
  const taskIndex = tasks.findIndex((task: Task) => task.id === taskId);
  const defaultValue = {
    id: "",
    title: "",
    description: "",
    status: TodoStatus.TODO,
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
      allTasks[taskIndex] = { ...data };
    } else {
      const id = crypto.randomUUID();
      allTasks = [...allTasks, { ...data, id }];
    }
    localStorage.setItem("tasks-array", JSON.stringify(allTasks));
    setTasks(allTasks);
    navigate("/");
  };

  useEffect(() => {
    if (taskData) reset({ ...taskData });
  }, []);

  return (
    <form
      className={darkMode ? "add-edit-form" : "add-edit-form-light"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="form-title">{!taskData ? `Add Task` : `Edit Task`}</h2>

      <label>
        <b>Enter Title: </b>
        <br />
        <input
          {...register("title")}
          type="text"
          className={darkMode ? "title input-tag" : "title input-light"}
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
          className={darkMode ? "title input-tag" : "title input-light"}
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
          className={
            darkMode ? "status-select input-tag" : "status-select input-light"
          }
        >
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
