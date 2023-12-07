import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./backButton.css";
const BackButton = () => {
  return (
    <div className="header">
      <Link to="/">
        <button className="header-btn">
          <FaArrowLeft className="icon" />
          <span className="btn-text"> Voltar</span>
        </button>
      </Link>
    </div>
  );
};

export default BackButton;
