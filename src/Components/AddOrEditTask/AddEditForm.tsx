import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./AddEditForm.css";

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

export default function AddEditForm() {
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
      setError("root", {
        message: "This email is already taken",
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
            <option disabled>Select Status</option>
            <option value={"todo"}>Todo</option>
            <option value={"in-progress"}>In Progress</option>
            <option value={"done"}>Done</option>
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
