import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
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

  /*
  useEffect(() => {
    dispatch(fetchPolitician(Number(id)));
  }, [id]);*/

  const politicianState = useSelector(selectPolitician);
  useEffect(() => {
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
      return elected?.replace("선", "");
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
          console.log("전해주신 소중한 이야기를 기록했어요.")
          //dispatch(fetchUser(data.author_id));
          //navigate("/articles/" + id, {state: {author_id: data.author_id, passedUserState: userState}});
          window.location.reload()
        } else {
          console.log("오류가 발생하였습니다.");
        }

      } else {
        const msg = ['앗, 로그인이 필요합니다! 저희가 이동시켜 드릴게요.']
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
  
    <div className = "background">
        {/* <NavBar/> */}

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
              <span id="q_political-party-title">정당</span>
              <p id="q_polticial-party-name">{politician?.political_party}</p>
            </div>
          </div>
        </div>
        <div className="q_right">
          <div className="q_intro">
            <h2 id="q_intro-title">의원소개</h2>
          </div>
          <div className="q_number-intro-header">
            <h4 id="q_number-intro-header">숫자로 보는 정보</h4>
          </div>
          <div id="q_number-intro-body">
            <NumberInfo
              num={getElectedNumber(politician?.reelection)}
              category="당선횟수"
              detail={politician?.election_units}
            ></NumberInfo>
            <NumberInfo
              num={politician?.proposals.split("\n").length}
              category="법안발의수"
              detail="21대 국회내 통계"
            ></NumberInfo>
            <NumberInfo
              num="temp"
              category="관심랭킹"
              detail="관심의원등록수"
            ></NumberInfo>
          </div>
          <div className="q_education-and-career-header">
            <h4 id="q_intro-education-and-career">학력 및 경력</h4>
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
                  if (td.includes("학력") || td.includes("경력")) {
                    return <p id="q_mini-title">{td}</p>;
                  } else {
                    return <li>{td}</li>;
                  }
                })}
            </p>
          </div>
          <div className="q_proposals-header">
            <h4 id="q_proposals-header">발의안</h4>
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
    <br></br>
    <br></br>
              
        <div className="qoraDetail_text1" id= "qoraDetail_text1">
          <br></br>
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
    );
  }
  
  export default QuoraDetailPage