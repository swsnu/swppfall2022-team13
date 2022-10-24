import { useNavigate } from "react-router-dom";
import "./ImageBtn.css";
export interface ImageBtnType {
  image?: string;
  url: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ImageBtn(props: ImageBtnType) {
  //clickhandler 추가하기
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(props.url);
  };
  return (
    <div className={props.className}>
      <img
        src={props.image}
        alt="hmm"
        onClick={onClickHandler}
        width={props.width}
        height={props.height}
      ></img>
    </div>
  );
}
