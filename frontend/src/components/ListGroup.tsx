import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";

export interface ListInterface {
  title: string;
  content: string;
}

export default function List(props: ListInterface) {
  return (
    <ListGroup horizontal>
      <ListGroup.Item>{props.title}</ListGroup.Item>
      <ListGroup.Item>{props.content}</ListGroup.Item>
    </ListGroup>
  );
}
