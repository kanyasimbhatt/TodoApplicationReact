import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewAllProduct from "./Components/viewAllProduct/ViewAllProduct";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ViewAllProduct />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
