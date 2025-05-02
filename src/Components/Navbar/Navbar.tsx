import navbarLogo from "../../assets/images-removebg-preview.png";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar({ buttonName }: { buttonName: string }) {
  const navigate = useNavigate();
  function handleNavbarButtonClick() {
    if (buttonName === "Add Task") {
      navigate("/add-task");
    } else {
      navigate("/");
    }
  }
  return (
    <nav className="navbar-div">
      <div className="navbar-logo-title">
        <img src={navbarLogo} alt="navbar logo" className="navbar-logo" />
        <h2>Manager</h2>
      </div>
      <div className="navbar-button">
        <button onClick={handleNavbarButtonClick}>{buttonName}</button>
      </div>
    </nav>
  );
}
