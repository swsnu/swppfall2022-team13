import "./Petition.css";
import { useNavigate } from "react-router-dom";


export interface PetitionType {
  id?: number;
  title?: string;
  content?: string;
  author?: number;
  vote?: number;
}

export default function Petition(props: PetitionType) {
    const navigate = useNavigate();
    const onClickHandler = () => {
      navigate("/petition/" + props.id);
    };

    return (
        <div className="PetitionsEach">
          
          <div className="PetitionId">{props?.id}</div>
          <div className="authorName">{props?.author}</div>
          <button className="petitonTitle" type="button" id={props.title} onClick={onClickHandler}><b>{props.title}</b></button>
          
          <p></p>
          
        </div>
      );

  }
