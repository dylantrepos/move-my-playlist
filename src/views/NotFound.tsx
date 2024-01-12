import { useNavigate } from "react-router-dom";
import { TitleItem } from "../components/TitleItem";
import './styles/NotFound.scss';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="notFound__main-container">
      <TitleItem>404</TitleItem>
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
