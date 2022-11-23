import "./Petition.css";
import { useNavigate } from "react-router-dom";


export interface PetitionType {
  id?: number;
  title?: string;
  content?: string;
  author?: number;
  vote?: number;
  photo_url?: string;
}

export default function Petition(props: PetitionType) {
    const navigate = useNavigate();
    const onClickHandler = () => {
      navigate("/petition/" + props.id);
    };

    return (
        <div className="PetitionsEach">
          
          <div className="PetitionTitle">{props?.title}</div>
          <div className="PetitionContent">{props?.content}</div>
          <button className="petitonTitle" type="button" id={props.title} onClick={onClickHandler}><b>Details</b></button>
          
          <p></p>
          
        </div>
      );

  }
