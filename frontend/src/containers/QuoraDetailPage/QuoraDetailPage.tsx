import NavBar from '../../components/NavBar/NavBar'
import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from 'react-router-dom';
import { useParams } from "react-router";
import { AppDispatch } from "../../store";
import { fetchQuoras, selectQuora, deleteQuora } from "../../store/slices/quora";
import Quora, { QuoraType,} from "../../components/Quora/Quora";



const QuoraDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const quoraState = useSelector(selectQuora);
  const { id } = useParams(); //fetch number from current url

  var currQuoraId:number = 1;
      if(id !== undefined) {
        currQuoraId = parseInt(id) //current url number is stored into currArticleId
        }
  console.log("curr id is: " + currQuoraId)

  useEffect(() => {  //fetch all articles and save them to articleState
    dispatch(fetchQuoras());
  }, []); 

  const quora = quoraState.quoras.find((value:any) => value.id === currQuoraId); //find petition with same id 
                                                                                         //this page should display THIS petition

  if(!quora) { //if there is no petition found with the id, go back to petitionList (wrong URL)
    navigate ("/quora")
  }

  const handleDelete = async () => { //When User Implemented, this should be ONLY FOR CREATOR

    if (window.confirm("Are you sure? This is irreversible!")) {
      if(quora !== null && quora !== undefined) {
        dispatch(deleteQuora(quora.id));
      }
    } else {
    }

  };

  const authorName = "허경영" //When User Implemented, this should be find names based on ID


  return ( //POLITICIAN LIST랑 연동하여 사진, 정보 등 가져오기!!!
    <div className = "background_red">
        <NavBar/>
      <div className="card">
        
      
      <div className="card-header text-bg-danger mb-3">
        Current Quora: {authorName}
      </div>

      <div className="card-body">
        <h5 className="card-title">{quora?.title}</h5>
      </div>

      <div className="card-body">
        <p className="card-text">{quora?.content}</p>
        <p>
        <a href="/petition" className="btn btn-primary">Back</a>
        &nbsp; &nbsp;
        <button type="button" className="btn btn-primary" id="liveAlertBtn" onClick={handleDelete}>Close Quora</button>
        </p>
      </div>
      </div>
    </div>
    );
  }
  
  export default QuoraDetailPage