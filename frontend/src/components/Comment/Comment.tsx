import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { selectUser} from "../../store/slices/user";
import { deleteComment } from "../../store/slices/comment";
import axios from 'axios';
import { SystemSecurityUpdate } from "@mui/icons-material";
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
    const [commentDisplay, setCommentDisplay] = useState(props.content);
    const [user_email, setUserEmail] = useState("");
    const [user_id, setUserId] = useState(0);

    console.log("current comment id is: " + props.id + " and current author id is: " + props.author_id + " and current quora id is: " + props.quora_id)

    
    
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
      }, []);

    const clickDelete = () => {       
        dispatch(deleteComment(props.id));
      }  


    if(user_id === props.author_id) {
      return (
        <div className="CommentsEach">
          <div className="commentorName" id="comment-author">{user_id}</div>
          <b><div className="commentContent" id="comment-content">{commentDisplay}</div></b>
          <p></p>
          <button type="button" id="delete-comment-button" onClick={clickDelete}>delete comment</button>
          <p></p>
  
        </div>
      );
    } else {
      return (
        <div className="CommentsEach">
          <div className="commentorName" id="comment-author">{user_id}</div>
          <b><div className="commentContent" id="comment-content">{commentDisplay}</div></b>
          <p></p>
        </div>
      );
    }
  };
  export default Comment;