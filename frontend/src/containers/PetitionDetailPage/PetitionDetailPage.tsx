import axios from 'axios';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from "../../store";
import { deletePetition, fetchPetitions, selectPetition, voteDown, voteUp } from "../../store/slices/petition";
import "./PetitionDetailPage.css";
import Button from '@mui/material/Button';

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

  useEffect(() => {
    window.scrollTo({
      top: 0
    });
    
    //fetch all articles and save them to articleState
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
        if (window.confirm("정말 청원을 지우시겠어요?\n사람들이 이곳에 남긴 소중한 한표가 모두 사라집니다.\n이는 돌이킬 수 없습니다.")) {
          if(petition !== null && petition !== undefined) {
            dispatch(deletePetition(petition.id));
          }
        } else {
        }
      } else {
        const msg = ['앗, 당신은 이 청원의 소유자가 아니시군요!']
      alert(msg)

      }
    } else{
      const msg = ['앗, 로그인이 필요합니다! 저희가 이동시켜 드릴게요.']
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
          const msg = ['변화를 향한 소중한 한표에 감사드립니다.']
          alert(msg)
        } else {
          dispatch(voteDown(petition.id));
          localStorage.removeItem("vote" + petition.id)
          const msg = ['투표를 취소했어요.\n누구나에게나 말할 수 없는 이유는 존재하니까요.\n언제든 다시 돌아오길 기다릴게요.']
          alert(msg)
        }
        
      }
    } else{
      const msg = ['앗, 로그인이 필요합니다! 저희가 이동시켜 드릴게요.']
      alert(msg)
      navigate('/login');
    }
  };

  
  return (
    <div className = "background_red">
        {/* <NavBar/> */}
      <div className="card">
        
      
      <div id = "petiton-card-header" className="card-header">
        이 청원은 지금까지 {petition?.vote} 명이 동의했어요
      </div>

      <br></br> 
      당신의 작은 참여가 온 세상을 바꿉니다.
      <br></br> 
      이 청원은 정정당당이 가져온 {petition?.id} 번째 변화입니다.
      <p></p>
      <p></p>
      <p><img src={petition?.photo_url} 
          width = "600px"
          height = "300px" 
          object-fit = "cover"
          className="rounded mx-auto d-block" alt="..."></img></p>

      <div className="card-body">
        <b><h5 className="card-title">{petition?.title}</h5></b>
      </div>

      <div className="card-body">


        <p id = "petition-card-text" className="card-text" >{petition?.content}</p>
        <p>
        <Button className="btn" sx={{bgcolor: '#b68763', ':hover': {bgcolor: '#e8bb98'}}} variant="contained" id="liveAlertBtn" onClick={handleDelete}>🗑️ 청원 삭제</Button>
        &nbsp; &nbsp;
        <Button className="btn" sx={{bgcolor: '#b68763', ':hover': {bgcolor: '#e8bb98'}}} variant="contained" id="voteBtn" onClick={handleVote}>✅ 동의해요!</Button>
        </p>
      </div>
      </div>
    </div>
    );
  }
  
  export default PetitionDetailPage