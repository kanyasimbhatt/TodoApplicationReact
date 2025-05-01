import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./AddEditTask.css";

type StatusType = "Todo" | "In Progress" | "Done";

const isValidValue = (val: unknown): boolean => {
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

export default function AddEditTask() {
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //add custom error setting and handling

    try {
      if (!localStorage.getItem("tasks-array")) {
        localStorage.setItem("tasks-array", JSON.stringify([]));
      }

      const tasks = JSON.parse(localStorage.getItem("tasks-array") as string);
      tasks.push(data);
      localStorage.setItem("tasks-array", JSON.stringify(tasks));
      const inputElement = document.querySelectorAll("#input-tag");
      inputElement.forEach((element) => {
        if (element.className === "status-select") {
          (element as HTMLSelectElement).selectedIndex = 0;
        } else (element as HTMLInputElement).value = "";
      });
    } catch (err) {
      console.log(err);
      setError("root", {
        message: "This email is already taken",
      });

      //you can add root inplace of email if the error is related to the form as a whole
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
            <div style={{ color: "red" }}>{errors.title.message}</div>
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
            <div style={{ color: "red" }}>{errors.description.message}</div>
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
            <option disabled>Select Status</option>
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
          <div style={{ color: "red" }}>{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}
