import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const UserPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  async function logoutHandler(){
    await axios.get("/api/user/signout");
    navigate("/main/");
  }

    return (
        <>
          <h1>UserPage</h1>
          <h3>USER_ID: {id}</h3>
              <p>
              Hi welcome to JJDD!
              </p>
          <button onClick={logoutHandler}>Logout</button>
        </>
      );
  }
  
  export default UserPage