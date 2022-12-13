import "./Quora.css";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { fetchPoliticians, selectPolitician } from "../../store/slices/politician";
import { AppDispatch } from "../../store";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export interface QuoraType {
  id?: number;
  title?: string;
  content?: string;
  author?: number;
  author_politicianId?: number;
}

export default function Quora(props: QuoraType) {
    const dispatch = useDispatch<AppDispatch>();

    const politicianState = useSelector(selectPolitician);
    useEffect(() => {
    dispatch(fetchPoliticians());
  }, []); 

  const politician = politicianState.politicians.find((p) => {
    return p.id === props.author_politicianId; //quora.author <- politician id is stored
  });

    const navigate = useNavigate();
    console.log(props.author_politicianId)
    const onClickHandler = () => {
      navigate("/quora/" + props.id);
    };

    return (

      
        <div className="QuorasEach">

            <div className="card" >
              <div className="QuorasImage" id="QuorasImage">
                <img src={politician?.image_src} width={200} height={250} />
              </div>
              <div className="card-body">
                <p className="card-text">정치인 <b>{props?.title}</b></p>
                <Button className= "btn btn-info" variant="primary" id={props.title} onClick={onClickHandler} >참여할게요</Button>
              </div>
            </div>


        </div>
      );

  }
