import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import Comment from "../../components/Comment/Comment";
import NumberInfo from "../../components/NumberInfo/NumberInfo";
import { AppDispatch } from "../../store";
import { fetchComments, postComment, selectComment } from "../../store/slices/comment";
import { fetchPoliticians, selectPolitician } from "../../store/slices/politician";
import { deleteQuora, fetchQuoras, selectQuora } from "../../store/slices/quora";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "./QuoraDetailPage.css";



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
  const [titleInput, setTitleContent] = useState<string>("");
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

  var quora = quoraState.quoras.find((value:any) => value.id === currQuoraId);

  /*
  useEffect(() => {
    dispatch(fetchPolitician(Number(id)));
  }, [id]);*/

  const politicianState = useSelector(selectPolitician);
  useEffect(() => {
    // Scroll goes up
    window.scrollTo({
      top: 0,
    });
    dispatch(fetchPoliticians());
  }, []); 
  
  const politician = politicianState.politicians.find((p) => {
    return p.id === quora?.author_politicianId; //quora.author <- politician id is stored
  });
  
  /*
  const politician = politicianContents.find((p) => {
    return p.id === quora.author; //quora.author <- politician id is stored
  });*/


  if(!quora) { //if there is no petition found with the id, go back to petitionList (wrong URL)
    dispatch(fetchQuoras());
    quora = quoraState.quoras.find((value:any) => value.id === currQuoraId);
    if(!quora) {
      navigate ("/quora")
    }
    
  }

  const handleDelete = async () => { //When User Implemented, this should be ONLY FOR CREATOR

    if (window.confirm("?????? ????????? ????????????????\n???????????? ????????? ?????? ????????? ??????????????? ?????? ???????????????.\n?????? ????????? ??? ????????????.")) {
      const response = await axios.get("/api/user/islogin/");
      console.log("Login status: ", response.data);
      const isLogin = response['data']['status'];

      if(isLogin && response.data.id !== 2){
      //const user_email = response['data']['email'];
      const user_id = response['data']['id'];

      if(user_id === quora?.author) {
          if(quora !== null && quora !== undefined) {
            dispatch(deleteQuora(quora?.id));
            navigate("/quora")
          }
      } else {
        const msg = ['???, ????????? ??? ????????? ???????????? ???????????????!']
        alert(msg)
      }
    } else {
      const msg = ['???, ???????????? ???????????????! ????????? ???????????? ????????????.']
            alert(msg)
            navigate("/login")
    }
  } else {

  }

  };

  const handleHurray  = async () => {

    const response = await axios.get("/api/user/islogin/");
    console.log("Login status: ", response.data);
    const isLogin = response['data']['status'];

    if(isLogin && response.data.id !== 2){
    const user_email = response['data']['email'];
    const user_id = response['data']['id'];
    console.log("curr user id is: " + user_id)

    if (!localStorage.getItem("hurray" + quora?.id)) {
      localStorage.setItem("hurray" + quora?.id, "true")
      const data = { author_id: user_id, quora_id: currQuoraId, content: "????????? ???????????????!" };
      const result = await dispatch(postComment(data));
      const msg = ["????????? ????????? ???????????????."]
      alert (msg)
    } else {
      const msg = ['????????? ????????? ????????? ????????? ?????? ?????? ???????????????!\n?????? ????????? ???????????? ?????????????']
      alert(msg)
    }


    } else {
      const msg = ['???, ???????????? ???????????????! ????????? ???????????? ????????????.']
      alert(msg)
      navigate("/login")
    }
  }

  const getElectedNumber = (elected: string) => {
    if (elected == "??????") {
      return 1;
    } else if (elected == "??????") {
      return 2;
    } else {
      return elected?.replace("???", "");
    }
  };

  const authorName = politician?.name //When User Implemented, this should be find names based on ID


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
          
          const msg = ["???????????? ????????? ???????????? ???????????????."]
          alert (msg)
          title = ""
          window.location.reload()
          //dispatch(fetchUser(data.author_id));
          //navigate("/articles/" + id, {state: {author_id: data.author_id, passedUserState: userState}});
          
        } else {
          console.log("????????? ?????????????????????.");
        }

      } else {
        const msg = ['???, ???????????? ???????????????! ????????? ???????????? ????????????.']
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


  return ( //POLITICIAN LIST??? ???????????? ??????, ?????? ??? ????????????!!!
  
    <div className = "background">
        {/* <NavBar/> */}
    <div className = "polls">
        <div className="q_PoliticianDetailPage">
      <div>
        <div className="q_left">
          <img src={politician?.image_src} width={200} height={250} />
          <h4 id="q_name">{politician?.name + " " + politician?.job}</h4>
          <p id="q_birth-date">{politician?.birth_date}</p>
          <div className="q_political-party">
            <div>
              <img
                id="q_na-image"
                src="http://www.mcnews.co.kr/imgdata/mcnews_kr/201404/20140408_161951_1f37cd4.jpg"
                width={50}
                height={50}
              ></img>
            </div>
            <div id="q_political-party-right">
              <span id="q_political-party-title">??????</span>
              <p id="q_polticial-party-name">{politician?.political_party}</p>
            </div>
          </div>
        </div>
        <div className="q_right">
          <div className="q_intro">
            <h4 id="q_intro-title">?????? ????????? ????????? ?????? ??????????????? ??????????</h4>
          </div>
          <div className="q_number-intro-header">
            <h4 id="q_number-intro-header">????????? ?????? ??????</h4>
          </div>
          <div id="q_number-intro-body">
            <NumberInfo
              num={getElectedNumber(politician?.reelection)}
              category="????????????"
              detail={politician?.election_units}
            ></NumberInfo>
            <NumberInfo
              num={politician?.proposals.split("\n").length}
              category="???????????????"
              detail="21??? ????????? ??????"
            ></NumberInfo>
            
          </div>
          <div className="q_education-and-career-header">
            <h4 id="q_intro-education-and-career">?????? ??? ??????</h4>
            {career ? (
              <ArrowDropUpIcon onClick={onCareerClickHandler}></ArrowDropUpIcon>
            ) : (
              <ArrowDropDownIcon
                onClick={onCareerClickHandler}
              ></ArrowDropDownIcon>
            )}
          </div>
          <div className={career ? "education-and-career-body" : "none"}>
            <p>
              {politician?.career_summary
                .replaceAll("&middot;", ", ")
                .replaceAll("&#039", ", ")
                .replaceAll("&bull;", ", ")
                .split("\r\n")
                .map((td) => {
                  if (td === "") return;
                  if (td.includes("??????") || td.includes("??????")) {
                    return <p id="q_mini-title">{td}</p>;
                  } else {
                    return <li>{td}</li>;
                  }
                })}
            </p>
          </div>
          <div className="q_proposals-header">
            <h4 id="q_proposals-header">?????????</h4>
            {prop ? (
              <ArrowDropUpIcon onClick={onPropClickHandler}></ArrowDropUpIcon>
            ) : (
              <ArrowDropDownIcon
                onClick={onPropClickHandler}
              ></ArrowDropDownIcon>
            )}
          </div>
          <div className={prop ? "proposals-body" : "none"}>
            <p>
              {politician?.proposals.split("\n").map((td) => {
                if (td != "") return <li>- {td}</li>;
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>

    
    <div className = "quora_all" id = "quora_all">

        <div className="quoraDetail_text1" id= "quoraDetail_text1">
          <p></p>
            Current Quora: {authorName} This isn't easter egg or bug.
            <br></br>
            DO NOT REMOVE: it's here for CSS reason
          

          <div className="text2">
            <h5>{quora?.title}</h5>
          </div>

        </div>

        <div className="quoraDetail_text2" id= "quoraDetail_text2">
        <br></br>
          ????????? {authorName}??? ???????????????.
        </div>
        <br></br>
        <div className="text2">
          ?????? ????????? ????????????????
          <br></br>
          ?????? ?????????. 
          <br></br>
          ?????? ????????? ???????????? ???????????????.
         
        </div>
        
        
        <br></br>


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
        <br></br>
        <label>
          ????????? ????????? ????????????:
          &nbsp; &nbsp;
          <input type="text" placeholder="????????? ???????????????" id ="new-comment-content-input" value={title} onChange={(event) => setCommentContent(event.target.value)} />
        </label>
        
          &nbsp; &nbsp;
          <Button className="btn" id="delete-comment-button" sx={{bgcolor: '#b68763', ':hover': {bgcolor: '#e8bb98'}}} variant="contained" disabled={!text} onClick={() => postCommentHandler()}>??? ?????? ?????????</Button>
          <br></br>
        </div>


        <br></br>
          <Button className= "btn btn-info" sx={{bgcolor: '#b68763', ':hover': {bgcolor: '#e8bb98'}}} variant="contained" href="/quora" >???? ???????????????</Button>
          &nbsp; &nbsp;
          <Button className= "btn btn-info" sx={{bgcolor: '#b68763', ':hover': {bgcolor: '#e8bb98'}}} variant="contained" onClick={handleHurray} >???????? ????????????</Button>
          &nbsp; &nbsp;
          <Button className= "btn btn-info" sx={{bgcolor: '#b68763', ':hover': {bgcolor: '#e8bb98'}}} variant="contained" onClick={handleDelete} >??? ????????? ????????????</Button>
          <br></br>


      
      </div>
    </div>
    );
  }
  
  export default QuoraDetailPage