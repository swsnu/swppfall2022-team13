import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { selectUser} from "../../store/slices/user";
import { deleteComment } from "../../store/slices/comment";
import { fetchQuora, selectQuora, deleteQuora, fetchQuoras } from "../../store/slices/quora";
import axios from 'axios';
import "./Comment.css";
import { SystemSecurityUpdate } from "@mui/icons-material";
import Button from '@mui/material/Button';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


export interface IProps {
    id: number
    quora_id: number
    author_id: number
    content: string
    clickDetail?: () => void; // Defined by React
    clickDelete?: () => void;
  }
  
  const Comment = (props: IProps) => {

    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector(selectUser);
    const quoraState = useSelector(selectQuora);
    const [commentDisplay, setCommentDisplay] = useState(props.content);
    const [user_email, setUserEmail] = useState("");
    const [user_id, setUserId] = useState(0);
    
    
    useEffect(() => {
        async function fetchAndSetUser() {
            const response = await axios.get("/api/user/islogin/");
            console.log("Login status: ", response.data);
            const isLogin = response['data']['status'];

            if(isLogin && response.data.id !== 2){
            //setUserEmail(response['data']['email']);
            setUserId(response['data']['id']);
            }

        }
        fetchAndSetUser();
        fetchQuoras();
      }, []);

    const clickDelete = () => {   
      if (user_id === props?.author_id) {
        const msg = ['소식을 지웠어요.\n누구나에게나 말할 수 없는 슬픔은 존재하니까요.\n언제든 돌아오길 기다릴게요.']
        alert(msg)
        dispatch(deleteComment(props?.id));
      } else {
        const msg = ['설마, 시민의 이야기를 멋대로 지우시려는 건가요?']
        alert(msg)
      }
        
      }  

    const quora = quoraState.quoras.find((value:any) => value.id === props.quora_id);


    if(user_id === props.author_id && quora?.author === props.author_id) {
      return (
        <div className="CommentsEach">
          <b><div className="commentorName" id="comment-author">{quora?.title} - 이 쿼라의 정치인</div></b>
          <b><div className="commentContent" id="comment-content">{commentDisplay}</div></b>
          <p></p>
          <Button className="btn" sx={{color:"gray", bgcolor: '#FFFFFF', ':hover': {bgcolor: '#e8bb98'}}} variant="contained" id="delete-comment-button" onClick={clickDelete}>🗑️ 지우기</Button>
          <p></p>
  
        </div>
      );
    } else if (quora?.author === props.author_id) {
      return (
        <div className="CommentsEach">
          <div className="commentorName" id="comment-author">{quora?.title} - 이 쿼라의 정치인</div>
          <b><div className="commentContent" id="comment-content">{commentDisplay}</div></b>
          <p></p>
  
        </div>
      );
    } else {
      return (
        <div className="CommentsEach">
          <div className="commentorName" id="comment-author">익명의 시민 {props?.author_id}</div>
          <b><div className="commentContent" id="comment-content">{commentDisplay}</div></b>
          <p></p>
          <Button className="btn" sx={{color:"gray", bgcolor: '#FFFFFF', ':hover': {bgcolor: '#e8bb98'}}} variant="contained" id="delete-comment-button" onClick={clickDelete}>🗑️ 지우기</Button>
          <p></p>
        </div>
      );
    }
  };
  export default Comment;