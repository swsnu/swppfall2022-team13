import { useState } from "react";
import UserInfoBtn, { UserInfoBtnType } from "../UserInfoBtn/UserInfoBtn"
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css'


const NavBar = () => {
  const navigate = useNavigate();

  const userInfoBtnContent: UserInfoBtnType = {
    url: "/user/1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3qAb5Xu6-hZguic1bPpFbicnmwOlHHIQ_ANoaY1xcLwrHfem6M1mNZkspUnq4u4DgjWs&usqp=CAU",
  };
  


return (
  <>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">JungJung DangDang</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/main" >Home</Nav.Link>
          <Nav.Link href="/news" >News List</Nav.Link>
          <Nav.Link href="/politician" >Politicians</Nav.Link>
        </Nav>
      </Container>

      <div className="navBar-userIcon">
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