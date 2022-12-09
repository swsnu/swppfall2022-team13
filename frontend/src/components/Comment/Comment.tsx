import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { selectUser} from "../../store/slices/user";
import { deleteComment } from "../../store/slices/comment";
import { fetchQuora, selectQuora, deleteQuora, fetchQuoras } from "../../store/slices/quora";
import axios from 'axios';
import { SystemSecurityUpdate } from "@mui/icons-material";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface IProps {
    id: number
    quora_id: number
    author_id: number
    content: string
    //clickDetail?: () => void; // Defined by React
    //clickDelete?: () => void;
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
      if (user_id === props.author_id) {
        dispatch(deleteComment(props.id));
      } else {
        const msg = ['access denied! : not your remark']
        alert(msg)
      }
        
      }  

    const quora = quoraState.quoras.find((value:any) => value.id === props.quora_id);


    if(user_id === props.author_id && quora.author === props.author_id) {
      return (
        <div className="CommentsEach">
          <b><div className="commentorName" id="comment-author">QUORA OWNER: {quora.title}</div></b>
          <b><div className="commentContent" id="comment-content">{commentDisplay}</div></b>
          <p></p>
          <button type="button" id="delete-comment-button" onClick={clickDelete}>delete remark</button>
          <p></p>
  
        </div>
      );
    } else if (quora.author === props.author_id) {
      return (
        <div className="CommentsEach">
          <div className="commentorName" id="comment-author">{quora.title}</div>
          <b><div className="commentContent" id="comment-content">{commentDisplay}</div></b>
          <p></p>
  
        </div>
      );
    } else {
      return (
        <div className="CommentsEach">
          <div className="commentorName" id="comment-author">{props.author_id}</div>
          <b><div className="commentContent" id="comment-content">{commentDisplay}</div></b>
          <p></p>
          <button type="button" id="delete-comment-button" onClick={clickDelete}>delete remark</button>
          <p></p>
        </div>
      );
    }
  };
  export default Comment;