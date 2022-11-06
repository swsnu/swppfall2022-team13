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
    <div className="navbar-main-buttons-tomain">
      <button className = "navBarBtn-main-button" type="button" id="navBarBtn-main-button" onClick={() => clickMainHandler()}>Main</button>
      <button className = "navBarBtn-newsList-button" type="button" id="navBarBtn-newsList-button" onClick={() => clickNewsListHandler()}>NewsList</button>
      <button className = "navBarBtn-politician-button" type="button" id="navBarBtn-politician-button" onClick={() => clickPoliticianHandler()}>Politician</button>
    </div>
  );
}
