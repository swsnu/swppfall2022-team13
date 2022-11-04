import { useNavigate } from "react-router-dom";
import "./UserInfoBtn.css";
export interface UserInfoBtnType {
  image?: string;
  url: string;
  className?: string;
}

export default function ImageBtn(props: UserInfoBtnType) {
  //clickhandler 추가하기
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(props.url);
  };
  return (
    <div className="UserInfoBtn">
      <img
        src={props.image}
        alt="hmm"
        onClick={onClickHandler}
        width={60}
        height={60}
      ></img>
    </div>
  );
}
