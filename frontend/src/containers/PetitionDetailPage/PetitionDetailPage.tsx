import NavBar from '../../components/NavBar/NavBar'
import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from 'react-router-dom';
import { useParams } from "react-router";
import { AppDispatch } from "../../store";
import { fetchPetitions, voteUp, selectPetition, deletePetition } from "../../store/slices/petition";
import Petition, { PetitionType,} from "../../components/Petition/Petition";



const PetitionDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const petitionState = useSelector(selectPetition);
  const { id } = useParams(); //fetch number from current url

  var currPetitionId:number = 1;
      if(id !== undefined) {
        currPetitionId = parseInt(id) //current url number is stored into currArticleId
        }
  console.log("curr id is: " + currPetitionId)

  useEffect(() => {  //fetch all articles and save them to articleState
    dispatch(fetchPetitions());
  }, []); 

  const petition = petitionState.petitions.find((value:any) => value.id === currPetitionId); //find petition with same id 
                                                                                         //this page should display THIS petition

  if(!petition) { //if there is no petition found with the id, go back to petitionList (wrong URL)
    navigate ("/petition")
  }

  const handleDelete = async () => { //When User Implemented, this should be ONLY FOR CREATOR

    if (window.confirm("Are you sure? This is irreversible!")) {
      if(petition !== null && petition !== undefined) {
        dispatch(deletePetition(petition.id));
      }
    } else {
    }

  };

  const handleVote = async () => {
      if(petition !== null && petition !== undefined) {
        dispatch(voteUp(petition.id));
        const msg = ['Voting Successful!']
        alert(msg)
      }

  };



  return (
    <div className = "background_red">
        <NavBar/>
      <div className="card">
        
      
      <div className="card-header text-bg-danger mb-3">
        Current Vote Counts: {petition?.vote}
      </div>

      <div className="card-body">
        <h5 className="card-title">{petition?.title}</h5>
      </div>

      <div className="card-body">
        <p className="card-text">{petition?.content}</p>
        <p>
        <a href="/petition" className="btn btn-primary">Back</a>
        &nbsp; &nbsp;
        <button type="button" className="btn btn-primary" id="liveAlertBtn" onClick={handleDelete}>Delete Petition</button>
        &nbsp; &nbsp;
        <button type="button" className="btn btn-primary" id="voteBtn" onClick={handleVote}>Vote!</button>
        </p>
      </div>
      </div>
    </div>
    );
  }
  
  export default PetitionDetailPage