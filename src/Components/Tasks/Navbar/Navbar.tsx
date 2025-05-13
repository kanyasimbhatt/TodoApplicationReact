import { useNavigate } from "react-router-dom";
import navbarLogo from "../../../assets/images-removebg-preview.png";
import "./Navbar.css";

type ButtonTextType = {
  buttonName: string;
};

export const Navbar: React.FC<ButtonTextType> = ({ buttonName }) => {
  const navigate = useNavigate();
  function handleNavbarButtonClick() {
    if (buttonName === "Add Task") {
      navigate(`/add-task`);
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
};
