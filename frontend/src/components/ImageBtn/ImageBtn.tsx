import { useNavigate } from "react-router-dom";
import "./ImageBtn.css";
export interface ImageBtnType {
  image?: string;
  url: string;
}

export default function ImageBtn(props: ImageBtnType) {
  //clickhandler 추가하기
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(props.url);
  };
  return (
    <div className="Btn">
      <img
        className="BtnImage"
        src={props.image}
        alt="hmm"
        onClick={onClickHandler}
        width={150}
        height={150}
      ></img>
    </div>
  );
}
