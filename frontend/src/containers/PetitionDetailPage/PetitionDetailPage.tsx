import NavBar from '../../components/NavBar/NavBar'
import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from 'react-router-dom';
import { useParams } from "react-router";
import { AppDispatch } from "../../store";
import { fetchPetitions, voteUp, voteDown, selectPetition, deletePetition } from "../../store/slices/petition";
import Petition, { PetitionType,} from "../../components/Petition/Petition";
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';



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

  const handleDelete = async () => {

    const response = await axios.get("/api/user/islogin/");
    console.log("Login status: ", response.data);
    const isLogin = response['data']['status'];

    if(isLogin && response.data.id !== 2){
      const user_id = response['data']['id'];

      if(petition.author === user_id) {
        if (window.confirm("Are you sure? This is irreversible!")) {
          if(petition !== null && petition !== undefined) {
            dispatch(deletePetition(petition.id));
          }
        } else {
        }
      } else {
        const msg = ['Access denied! : not an author']
      alert(msg)

      }
    } else{
      const msg = ['Login Required']
      alert(msg)
      navigate('/login');
    }

  };

  const handleVote = async () => {

    const response = await axios.get("/api/user/islogin/");
    console.log("Login status: ", response.data);
    const isLogin = response['data']['status'];

    if(isLogin && response.data.id !== 2){
      const user_id = response['data']['id'];
      //navigate('/user/'+ user_id.toString() + '/');
      if(petition !== null && petition !== undefined) {

        if (!localStorage.getItem("vote" + petition.id)) {
          dispatch(voteUp(petition.id));
          localStorage.setItem("vote" + petition.id, "true")
          const msg = ['Voting Successful!']
          alert(msg)
        } else {
          dispatch(voteDown(petition.id));
          localStorage.removeItem("vote" + petition.id)
          const msg = ['Unvote Successful!']
          alert(msg)
        }
        
      }
    } else{
      const msg = ['Login Required']
      alert(msg)
      navigate('/login');
    }
  };

  
  return (
    <div className = "background_red">
        {/* <NavBar/> */}
      <div className="card">
        
      
      <div className="card-header text-bg-danger mb-3">
        Current Vote Counts: {petition?.vote}
      </div>

      <img src={petition?.photo_url} 
          width = "600px"
          height = "300px" 
          object-fit = "cover"
          className="rounded mx-auto d-block" alt="..."></img>

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