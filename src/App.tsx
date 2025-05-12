import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ViewAllTaskWrapper } from "./Components/Tasks/ViewAllTasks/ViewAllTasks";
import { AddEditTaskWrapper } from "./Components/Tasks/AddOrEditTask/AddEditTask";
import { NotFound } from "./Components/Tasks/NotFound/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViewAllTaskWrapper />}></Route>
        <Route path="/add-task" element={<AddEditTaskWrapper />}></Route>
        <Route path="/edit-task/:id" element={<AddEditTaskWrapper />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
