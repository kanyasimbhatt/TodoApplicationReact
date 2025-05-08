import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ViewAllTask } from "./Components/Tasks/ViewAllTasks/ViewAllTasks";
import { AddEditTask } from "./Components/Tasks/AddOrEditTask/AddEditTask";
import { TaskProvider } from "./Components/Tasks/TaskProvider";
function App() {
  return (
    <>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ViewAllTask />}></Route>
            <Route path="/add-task" element={<AddEditTask />}></Route>
            <Route path="/add-task/:id" element={<AddEditTask />}></Route>
            <Route path="*" element={<ViewAllTask />}></Route>
          </Routes>
        </Router>
      </TaskProvider>
    </>
  );
}

export default App;
