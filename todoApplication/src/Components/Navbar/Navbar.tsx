import navbarLogo from "../../../public/images-removebg-preview.png";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/add-edit-product");
  }
  return (
    <nav className="navbar-div">
      <div className="navbar-logo-title">
        <img src={navbarLogo} alt="navbar logo" className="navbar-logo" />
        <h2>Manager</h2>
      </div>

      <div className="add-products">
        <button className="navbar-button" onClick={handleClick}>
          Add Product
        </button>
      </div>
    </nav>
  );
}
