import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useGlobalContext } from "../viewAllTasks/ViewAllTasks";
import "./AddEditForm.css";
import { Task } from "../ShowTasks/ShowTasks";

type StatusType = "Todo" | "In Progress" | "Done";

const isValidValue = (val: string): boolean => {
  if (val === "Todo" || val === "In Progress" || val === "Done") return true;
  return false;
};

z.custom<StatusType>((val) => isValidValue(val), {
  message: "Not a valid Status",
});

const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  status: z.custom(),
});

type FormFields = z.infer<typeof schema>;

export default function AddEditForm({ taskId }: { taskId: string }) {
  const navigate = useNavigate();
  const { setTask } = useGlobalContext();
  const allTasks = JSON.parse(localStorage.getItem("tasks-array") as string);
  const taskIndex = allTasks.findIndex((task: Task) => task.id === taskId);
  let task = allTasks[taskIndex];
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  if (!task) {
    task = {
      id: "",
      title: "",
      description: "",
      status: "",
    };
  }

  const [inputFields, setInputFields] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    try {
      if (taskId) {
        allTasks[taskIndex] = { ...data, id: taskId };
        localStorage.setItem("tasks-array", JSON.stringify(allTasks));
        setTask(allTasks);
        navigate("/");
      } else {
        const id = crypto.randomUUID();
        localStorage.setItem(
          "tasks-array",
          JSON.stringify([...allTasks, { ...data, id: id }]),
        );
        setTask([...allTasks, { ...data, id: id }]);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError("root", {
        message: "Was not able to submit the form",
      });
    }
  };

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
            id="input-tag"
            className="title"
            placeholder="Enter title"
            onChange={(e) =>
              setInputFields({ ...inputFields, title: e.target.value })
            }
            value={inputFields.title}
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
            id="input-tag"
            className="description"
            onChange={(e) =>
              setInputFields({ ...inputFields, description: e.target.value })
            }
            value={inputFields.description}
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
            id="input-tag"
            className="status-select"
            onChange={(e) =>
              setInputFields({ ...inputFields, status: e.target.value })
            }
            value={inputFields.status}
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
}
