import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useGlobalContext } from "../viewAllTasks/ViewAllTasks";
import "./AddEditForm.css";

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
  status: z.string(),
});

type FormFields = z.infer<typeof schema>;

export default function AddEditForm() {
  const navigate = useNavigate();
  const { setTask } = useGlobalContext();
  const allTasks = JSON.parse(localStorage.getItem("tasks-array") as string);
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const id = crypto.randomUUID();

    try {
      localStorage.setItem(
        "tasks-array",
        JSON.stringify([...allTasks, { ...data, id: id }])
      );
      setTask([...allTasks, { ...data, id: id }]);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("root", {
        message: "There was some issue in the process",
      });
    }
  };
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  return (
    <div>
      <form className="add-edit-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Add Task</h2>
        <label>
          {" "}
          <b>Enter Title: </b>
          <br />
          <input
            {...register("title")}
            type="text"
            id="input-tag"
            placeholder="Enter title"
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
          >
            <option value={"Todo"}>Todo</option>
            <option value={"In Progress"} disabled>
              In Progress
            </option>
            <option value={"Done"} disabled>
              Done
            </option>
          </select>
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
        {errors.root && (
          <div className="error-message">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}
