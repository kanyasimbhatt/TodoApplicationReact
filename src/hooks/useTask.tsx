import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export default function useTask() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
