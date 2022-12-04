import { useState } from "react";
import UserInfoBtn, { UserInfoBtnType } from "../UserInfoBtn/UserInfoBtn"
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css'


const NavBar = () => {

  const userInfoBtnContent: UserInfoBtnType = {
    url: "/user/1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3qAb5Xu6-hZguic1bPpFbicnmwOlHHIQ_ANoaY1xcLwrHfem6M1mNZkspUnq4u4DgjWs&usqp=CAU",
  };

return (
  <>
    <Navbar id='nav-bar' bg="dark" variant="dark">
      <Container>
        <Navbar.Brand id='to-logo' href="#home">JungJung DangDang</Navbar.Brand>
        <Nav id='navbar-buttons' className="me-auto">
          <Nav.Link id='to-main' href="/main" >Home</Nav.Link>
          <Nav.Link id='to-news' href="/news" >News List</Nav.Link>
          <Nav.Link id='to-politician' href="/politician" >Politicians</Nav.Link>
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
