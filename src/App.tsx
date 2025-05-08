import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ViewAllTaskWrapper } from "./Components/Tasks/ViewAllTasks/ViewAllTasks";
import { AddEditTaskWrapper } from "./Components/Tasks/AddOrEditTask/AddEditTask";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ViewAllTaskWrapper />}></Route>
          <Route path="/add-task" element={<AddEditTaskWrapper />}></Route>
          <Route path="/add-task/:id" element={<AddEditTaskWrapper />}></Route>
          <Route path="*" element={<ViewAllTaskWrapper />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
