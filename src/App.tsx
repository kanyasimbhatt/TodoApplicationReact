import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ViewAllTaskWrapper } from "./Components/Tasks/ViewAllTasks/ViewAllTasks";
import { AddEditTaskWrapper } from "./Components/Tasks/AddOrEditTask/AddEditTask";
import { NotFound } from "./Components/Tasks/NotFound/NotFound";
import { useDarkMode } from "./Components/Tasks/Navbar/DarkModeProvider";
import "./App.css";

function App() {
  const { darkMode } = useDarkMode();
  return (
    <div className={darkMode ? "" : "light-styles"}>
      <Router>
        <Routes>
          <Route path="/" element={<ViewAllTaskWrapper />}></Route>
          <Route path="/add-task" element={<AddEditTaskWrapper />}></Route>
          <Route
            path="/edit-task/:taskId"
            element={<AddEditTaskWrapper />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
