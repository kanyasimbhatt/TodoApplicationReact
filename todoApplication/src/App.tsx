import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewAllTask from "./Components/viewAllTasks/ViewAllTasks";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ViewAllTask />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
