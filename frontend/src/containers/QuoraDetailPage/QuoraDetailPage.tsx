import NavBar from '../../components/NavBar/NavBar'
import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from 'react-router-dom';
import { useParams } from "react-router";
import { AppDispatch } from "../../store";
import axios from 'axios';
import { fetchQuoras, selectQuora, deleteQuora } from "../../store/slices/quora";
import { selectPolitician } from "../../store/slices/politician";
import NumberInfo from "../../components/NumberInfo/NumberInfo";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  fetchPolitician,
  PoliticianType,
  fetchPoliticians,
} from "../../store/slices/politician";
import Quora, { QuoraType,} from "../../components/Quora/Quora";
import Comment from "../../components/Comment/Comment";
import { selectComment, postComment, fetchComments} from "../../store/slices/comment";



const QuoraDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const quoraState = useSelector(selectQuora);
  const commentState = useSelector(selectComment);
  const { id } = useParams(); //fetch number from current url
  const [career, setCareer] = useState(false);
  const [prop, setProp] = useState(false);
  const onCareerClickHandler = () => setCareer(!career);
  const onPropClickHandler = () => setProp(!prop);
  const [newCommentContent, setCommentContent] = useState<string>("");
  const [text, enableButton] = useState("");
  var title: string;
  var content: string;


  var currQuoraId:number = 1;
      if(id !== undefined) {
        currQuoraId = parseInt(id) //current url number is stored into currArticleId
        }
  console.log("curr id is: " + currQuoraId)

  useEffect(() => {  //fetch all articles and save them to articleState
    dispatch(fetchQuoras());
    dispatch(fetchComments());
    dispatch(fetchPoliticians());
  }, []); 

  const quora = quoraState.quoras.find((value:any) => value.id === currQuoraId);
  console.log("author politician id: " + quora.author_politicianId)

  /*
  useEffect(() => {
    dispatch(fetchPolitician(Number(id)));
  }, [id]);*/

  const politicianState = useSelector(selectPolitician);
  useEffect(() => {
    dispatch(fetchPoliticians());
  }, []); 
  
  const politician = politicianState.politicians.find((p) => {
    return p.id === quora.author_politicianId; //quora.author <- politician id is stored
  });
  
  /*
  const politician = politicianContents.find((p) => {
    return p.id === quora.author; //quora.author <- politician id is stored
  });*/


  if(!quora) { //if there is no petition found with the id, go back to petitionList (wrong URL)
    navigate ("/quora")
  }

  const handleDelete = async () => { //When User Implemented, this should be ONLY FOR CREATOR

    if (window.confirm("Are you sure? This is irreversible!")) {
      const response = await axios.get("/api/user/islogin/");
      console.log("Login status: ", response.data);
      const isLogin = response['data']['status'];

      if(isLogin && response.data.id !== 2){
      //const user_email = response['data']['email'];
      const user_id = response['data']['id'];

      if(user_id === quora.author) {
          if(quora !== null && quora !== undefined) {
            dispatch(deleteQuora(quora.id));
            navigate("/quora")
          }
      } else {
        const msg = ['Access denied! : you are not the owner of this quora']
        alert(msg)
      }
    } else {
      const msg = ['Login Required!']
            alert(msg)
            navigate("/login")
    }
  } else {

  }


  };

  const getElectedNumber = (elected: string) => {
    if (elected == "초선") {
      return 1;
    } else if (elected == "재선") {
      return 2;
    } else {
      return elected.replace("선", "");
    }
  };

  const authorName = politician.name //When User Implemented, this should be find names based on ID


  const postCommentHandler = async () => {

      const response = await axios.get("/api/user/islogin/");
      console.log("Login status: ", response.data);
      const isLogin = response['data']['status'];

      if(isLogin && response.data.id !== 2){
      const user_email = response['data']['email'];
      const user_id = response['data']['id'];
      console.log("curr user id is: " + user_id)
      const data = { author_id: user_id, quora_id: currQuoraId, content: newCommentContent };
      const result = await dispatch(postComment(data));

        if (result.type === `${postComment.typePrefix}/fulfilled`) {
          //setPath
          //setSubmitted(true);
          console.log("Comment Submitted")
          //dispatch(fetchUser(data.author_id));
          //navigate("/articles/" + id, {state: {author_id: data.author_id, passedUserState: userState}});
          navigate("/quora/" + currQuoraId)
        } else {
          console.log("Error on posting comment");
        }

      } else {
        const msg = ['Login Required!']
        alert(msg)
        navigate("/login")
      }
        
  };

  useEffect(() => {
    if(newCommentContent !== "") {
      enableButton(newCommentContent);
    } else {
      enableButton("");
    }
  }, [newCommentContent]);


  return ( //POLITICIAN LIST랑 연동하여 사진, 정보 등 가져오기!!!
  
    <div className = "background_red">
        {/* <NavBar/> */}

        <div className="PoliticianDetailPage">
      <div>
        <div className="left">
          <img src={politician.image_src} width={200} height={250} />
          <h4 id="name">{politician.name + " " + politician.job}</h4>
          <p id="birth-date">{politician.birth_date}</p>
          <div className="political-party">
            <div>
              <img
                id="na-image"
                src="http://www.mcnews.co.kr/imgdata/mcnews_kr/201404/20140408_161951_1f37cd4.jpg"
                width={50}
                height={50}
              ></img>
            </div>
            <div id="political-party-right">
              <span id="political-party-title">정당</span>
              <p id="polticial-party-name">{politician.political_party}</p>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="intro">
            <h2 id="intro-title">의원소개</h2>
          </div>
          <div className="number-intro-header">
            <h4 id="number-intro-header">숫자로 보는 정보</h4>
          </div>
          <div id="number-intro-body">
            <NumberInfo
              num={getElectedNumber(politician.reelection)}
              category="당선횟수"
              detail={politician.election_units}
            ></NumberInfo>
            <NumberInfo
              num={politician.proposals.split("\n").length}
              category="법안발의수"
              detail="21대 국회내 통계"
            ></NumberInfo>
            <NumberInfo
              num="temp"
              category="관심랭킹"
              detail="관심의원등록수"
            ></NumberInfo>
          </div>
          <div className="education-and-career-header">
            <h4 id="intro-education-and-career">학력 및 경력</h4>
            <img
              src={
                career
                  ? "https://png.pngtree.com/element_our/20190531/ourlarge/pngtree-up-arrow-image_1287479.jpg"
                  : "https://cdn.icon-icons.com/icons2/2098/PNG/512/arrow_down_icon_128951.png"
              }
              width={30}
              height={30}
              onClick={onCareerClickHandler}
              alt="career"
            ></img>
          </div>
          <div className={career ? "education-and-career-body" : "none"}>
            <p>
              {politician.career_summary
                .replaceAll("&middot;", ", ")
                .replaceAll("&#039", ", ")
                .replaceAll("&bull;", ", ")
                .split("\r\n")
                .map((td) => {
                  if (td === "") return;
                  if (td.includes("학력") || td.includes("경력")) {
                    return <p id="mini-title">{td}</p>;
                  } else {
                    return <li>{td}</li>;
                  }
                })}
            </p>
          </div>
          <div className="proposals-header">
            <h4 id="proposals-header">발의안</h4>
            <img
              src={
                prop
                  ? "https://png.pngtree.com/element_our/20190531/ourlarge/pngtree-up-arrow-image_1287479.jpg"
                  : "https://cdn.icon-icons.com/icons2/2098/PNG/512/arrow_down_icon_128951.png"
              }
              width={30}
              height={30}
              alt="props"
              onClick={onPropClickHandler}
            ></img>
          </div>
          <div className={prop ? "proposals-body" : "none"}>
            <p>
              {politician.proposals.split("\n").map((td) => {
                if (td != "") return <li>- {td}</li>;
              })}
            </p>
          </div>
        </div>
      </div>
    </div>


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


      {commentState.comments.map((td: any) => {
          //console.log("comment's article id is:" + td.article_id)
          if(id !== undefined) {
            if (td.quora_id === currQuoraId ) {
            console.log('MATCH ID FOUND')
            return (
              <Comment
                key={`${td.id}_todo`}
                id={td.id}
                quora_id={td.quora_id}
                author_id = {td.author_id}
                content={td.content}
                //clickDetail={() => clickTodoHandler(td)}
                //clickDone={() => dispatch(toggleDone(td.id))}
                //clickDelete={() => dispatch(deleteArticle(td.id))}
              />
              
            );
          }
          }
        
          })}

        <div className="NewComment">
        <p></p>
        <label>
          Add a Remark:
          &nbsp; &nbsp;
          <input type="text" id ="new-comment-content-input" value={title} onChange={(event) => setCommentContent(event.target.value)} />
        </label>
          &nbsp; &nbsp;
        <button type="button" id="confirm-create-comment-button" disabled={!text} onClick={() => postCommentHandler()}>Post Remark</button>
        <p></p>
        </div>


      </div>
    </div>
    );
  }
  
  export default QuoraDetailPage