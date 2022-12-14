import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserInfoBtn.css";
export interface UserInfoBtnType {
  image?: string;
  url: string;
  className?: string;
}

export default function UserInfoBtn(props: UserInfoBtnType) {
  //clickhandler 추가하기
  const navigate = useNavigate();
  const onClickHandler = async () => {
    const response = await axios.get("/api/user/islogin/");
    console.log("Login status: ", response.data);
    const isLogin = response['data']['status'];

    if(isLogin && response.data.id !== 2){
      const user_id = response['data']['id'];
      console.log("navigating..." + '/user/'+ user_id.toString() + '/')
      console.log(response.data.email)
      navigate('/user/'+ user_id.toString() + '/');
    }
    else{
      console.log('not logged in')
      navigate('/login');
    }
  };
  return (
    <div className="UserInfoBtn">
      <img
        src={props.image}
        alt="hmm"
        onClick={onClickHandler}
        width={60}
        height={60}
      ></img>
    </div>
  );
}
