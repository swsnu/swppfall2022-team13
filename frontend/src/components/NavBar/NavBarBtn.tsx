import { useNavigate } from "react-router-dom";
import "./NavBarBtn.css"

export default function NavBarBtn() {
  const navigate = useNavigate();
  const clickMainHandler = () => {
    navigate("/main");
  };

  const clickNewsListHandler = () => {
    navigate("/news");
  };

  const clickPoliticianHandler = () => {
    navigate("/politician");
  };

  return (
    <div className="navbar-main-buttons">
      <button type="button" id="main-button" onClick={() => clickMainHandler()}>Main</button>
      <button type="button" id="newsList-button" onClick={() => clickNewsListHandler()}>NewsList</button>
      <button type="button" id="politician-button" onClick={() => clickPoliticianHandler()}>Politician</button>
    </div>
  );
}
