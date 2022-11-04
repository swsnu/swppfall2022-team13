import "./CarouselContent.css";
import { useNavigate } from "react-router-dom";

export interface CarouselContentType {
  title?: string;
  content?: string;
  url: string;
  image_src?: string;
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
    <div className="CarouselComponent" onClick={onClickHandler}>
      <div className="leftContent">
        <img
          className="image"
          src={props.image_src}
          alt="Hmm"
          width={props.width}
          height={props.height}
        />
      </div>
      <div className="rightContent">
        <div className="title">{props.title}</div>
        <p className="content">{props.content}</p>
      </div>
    </div>
  );
}
