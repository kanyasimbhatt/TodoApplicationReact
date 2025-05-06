import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewAllTask from "./pages/viewAllTasks/ViewAllTasks";
import AddEditTask from "./pages/AddOrEditTask/AddEditTask";
import TaskProvider from "./context/TaskContext/TaskProvider";
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
