import "./Quora.css";
import { useNavigate } from "react-router-dom";


export interface QuoraType {
  id?: number;
  title?: string;
  content?: string;
  author?: number;
}

export default function Quora(props: QuoraType) {
    const navigate = useNavigate();
    const onClickHandler = () => {
      navigate("/quora/" + props.id);
    };

    return (
        <div className="QuorasEach">
          
          <div className="quoraTitle">{props?.title}</div>
          <button className="quoraDetailBtn" type="button" id={props.title} onClick={onClickHandler}><b>Participate</b></button>
          
          <p></p>
          
        </div>
      );

  }
