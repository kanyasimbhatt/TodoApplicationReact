import navbarLogo from "../../../public/images-removebg-preview.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar-div">
      <img src={navbarLogo} alt="navbar logo" className="navbar-logo" />
      <h2>Manager</h2>
    </nav>
  );
}
