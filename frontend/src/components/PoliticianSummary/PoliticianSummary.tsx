import { useNavigate } from "react-router-dom";
import "./PoliticianSummary.css";
export interface PoliticianSummaryType {
  id: number;
  image?: string;
  name: string;
  birthdate: string;
  politicalParty: string;
  electionPrecinct: string;
}

export default function PoliticianSummary(props: PoliticianSummaryType) {
  //clickhandler 추가하기
  const navigate = useNavigate();
  const url = "/politician/" + String(props.id);
  const onClickHandler = () => {
    navigate(url);
  };
  return (
    <div className="PoliticianBox" onClick={onClickHandler}>
      <div>
        <div>
          <img
            className="image"
            src={props.image}
            alt="Hmm"
            width={200}
            height={200}
          />
        </div>
        <div>
          <p>{props.name}</p>
          <p>{props.birthdate}</p>
          <p>{props.politicalParty}</p>
          <p>{props.electionPrecinct}</p>
        </div>
      </div>
    </div>
  );
}
