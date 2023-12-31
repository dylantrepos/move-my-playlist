import { useNavigate } from "react-router-dom";
import { Title } from "../components/Title";
import './styles/NotFound.scss';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="notFound__main-container">
      <Title>404</Title>
      <p className="notFound__text">Page not found</p>
      <button 
        className="button-primary notFound__button"
        onClick={() => navigate("/")}
      >
        Back to home
      </button>
    </div>
  );
};
