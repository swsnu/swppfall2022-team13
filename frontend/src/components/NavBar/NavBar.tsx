import UserInfoBtn, { UserInfoBtnType } from "../UserInfoBtn/UserInfoBtn"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import './NavBar.css'


const NavBar = () => {

  const [user_id, setUserId] = useState(0);

  useEffect(() => {
    const userSet = async() => {
      const response = await axios.get("/api/user/islogin/");
      //console.log("Login status: ", response.data);
      const isLogin = response['data']['status'];

      if(isLogin && response.data.id !== 2){
        setUserId(response['data']['id']);
      }
    }

    userSet()
  
  }, []); 

      

  const userInfoBtnContent: UserInfoBtnType = {
    url: "/user/" + user_id,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3qAb5Xu6-hZguic1bPpFbicnmwOlHHIQ_ANoaY1xcLwrHfem6M1mNZkspUnq4u4DgjWs&usqp=CAU",
  };

return (
  <>
    <Navbar id='nav-bar' bg="dark" variant="dark">
      <Container>
        <Navbar.Brand id='to-logo' href="/main">JungJung DangDang</Navbar.Brand>
        <Nav id='navbar-buttons' className="me-auto">
          <Nav.Link id='to-main' href="/main" >Home</Nav.Link>
          <Nav.Link id='to-news' href="/news" >News List</Nav.Link>
          <Nav.Link id='to-politician' href="/politician" >Politicians</Nav.Link>
          <Nav.Link id='to-petition' href="/petition" >Petition</Nav.Link>
          <Nav.Link id='to-quora' href="/quora" >Quora</Nav.Link>
        </Nav>
      </Container>

      <div id='to-user' className="navBar-userIcon">
        <UserInfoBtn
        url={userInfoBtnContent.url}
        image={userInfoBtnContent.image}
      />

        </div>

    </Navbar>
    <br />

  </>
);
}

export default NavBar
