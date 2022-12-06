import "./CarouselContent.css";
import { useNavigate } from "react-router-dom";

export interface CarouselContentType {
  id?: number;
  title?: string;
  content?: string;
  url: string;
  detail_img_path?: string;
  width?: number;
  height?: number;
  tags?: string[];
}
export default function CarouselComponent(props: CarouselContentType) {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(props.url);
  };
  return (
    <div id="CarouselComponent" onClick={onClickHandler} key={props.id}>
      <div id="leftContent">
        <img
          className="image"
          src={props.detail_img_path}
          alt="Hmm"
          width={props.width}
          height={props.height}
        />
      </div>
      <div id="rightContent">
        <div className="title">{props.title}</div>
        <p className="content">{props.content}</p>
      </div>
    </div>
  );
}
