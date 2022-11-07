import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export interface PoliticianSummaryType {
  id: number;
  image?: string;
  name: string;
  birthdate: string;
  politicalParty: string;
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
        style={{ width: "18rem" }}
        bg="light"
        border="dark"
        body={true}
        text="primary"
      >
        <Card.Img variant="top" src={props.image} width={150} height={300} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.position}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{props.politicalParty}</ListGroup.Item>
          <ListGroup.Item>{props.birthdate}</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

export default PoliticianSummary;
