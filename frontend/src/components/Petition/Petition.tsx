import "./Petition.css";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState, useEffect} from "react";
import { selectUser } from "../../store/slices/user";
import {useDispatch, useSelector} from 'react-redux';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

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
    //const reduxUserState = useSelector(selectUser);
    //console.log(reduxUserState.email)
    const onClickHandler = () => {
      navigate("/petition/" + props.id);
    };

    const [user_id, userIdChanger] = useState(0);

  useEffect(() => {

  },[]);

    return (
      <Card style={{ width: '18rem', height: '25rem', float: 'left'}}>
        <Card.Img style={{ width: '18rem', height: '10rem', display: 'inline-block'}} variant="top" src={props.photo_url} />
        <Card.Body>
          <Card.Title>Current Vote: {props.vote}</Card.Title>
          <Card.Text>
          {props?.title}
          </Card.Text>
          <Button id= "detail-button" variant="primary" onClick={onClickHandler} >Details</Button>
        </Card.Body>
      </Card>
      
    );

  }
