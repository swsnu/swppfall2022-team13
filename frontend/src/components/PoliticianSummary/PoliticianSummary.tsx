import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export interface PoliticianSummaryType {
  id: number;
  image_src?: string;
  name: string;
  birthdate: string;
  politicalParty: string;
  elect: string;
  position: string;
}

function PoliticianSummary(props: PoliticianSummaryType) {
  const navigate = useNavigate();
  const url = "/politician/" + String(props.id);
  const onClickHandler = () => {
    navigate(url);
  };
  return (
    <div onClick={() => onClickHandler()}>
      <Card
        style={{ width: "13rem", height: "26rem" }}
        bg="light"
        border="dark"
        body={true}
        text="primary"
      >
        <img src={props.image_src} width={160} height={190} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.position}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{props.politicalParty}</ListGroup.Item>
          <ListGroup.Item>{props.elect}</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

export default PoliticianSummary;
