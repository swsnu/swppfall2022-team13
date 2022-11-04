
import { Navbar } from 'react-bootstrap'
import UserInfoBtn, { UserInfoBtnType } from "../UserInfoBtn/UserInfoBtn"
import './NavBar.css'


const userInfoBtnContent: UserInfoBtnType = {
  url: "/user/1",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3qAb5Xu6-hZguic1bPpFbicnmwOlHHIQ_ANoaY1xcLwrHfem6M1mNZkspUnq4u4DgjWs&usqp=CAU",
};

const NavBar = () => {
  return (
    <>
      <Navbar bg='light' expand='lg'>
        <div className='navBar-title'>
       <h1>This is JJDD</h1> 
        </div>
        <div className='navBar-userIcon'>

        <UserInfoBtn
        url={userInfoBtnContent.url}
        image={userInfoBtnContent.image}
      />

        </div>
      </Navbar>
    </>
  )
}

export default NavBar