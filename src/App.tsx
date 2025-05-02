import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewAllTask from "./Components/viewAllTasks/ViewAllTasks";
import AddEditTask from "./Components/AddOrEditTask/AddEditTask";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ViewAllTask />}></Route>
          <Route path="/add-task" element={<AddEditTask />}></Route>
          <Route path="/edit-task:id" element={<AddEditTask />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
