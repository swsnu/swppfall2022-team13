
import axios from 'axios'
import { useState } from 'react'
import { Form, Row } from 'react-bootstrap'
import { useDispatch, } from 'react-redux'
import { useNavigate } from 'react-router'
import { AppDispatch } from "../../store"
import { postPetition } from "../../store/slices/petition"
import Button from '@mui/material/Button';
import "./PetitionCreatePage.css";

const PetitionCreatePage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [photo_url, setURL] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()



  const clickCreateHanler = async () => {
    const response = await axios.get("/api/user/islogin/");
    console.log("Login status: ", response.data);
    const isLogin = response['data']['status'];

    if(isLogin && response.data.id !== 2){
      const user_id = response['data']['id'];

      const validationCheckList = [title, content]
    const validationMessages = ['청원 제목', '청원 내용']

    if (validationCheckList.some(value => !value)) {
      const msg = ['앗, 다음 항목이 비어있어요:']
      validationCheckList.forEach((value, index) => {
        if (!value) {
          msg.push(validationMessages[index])
        }
      })
      alert(msg.join('\n'))
      return
    }

    const petitionData = {
      title,
      content,
      author: user_id, 
      vote: 0,
      photo_url: photo_url,
    }
    
    if(photo_url==='') {
      petitionData.photo_url = 'http://monthly.chosun.com/upload/2109/2109_386.jpg'
    }

    const responsePetition = await dispatch(postPetition(petitionData))
    const msg2 = ['청원을 올렸어요. 항상 당신을 응원할게요.']
      alert(msg2)

    if (responsePetition.type === `${postPetition.typePrefix}/fulfilled`) {
      
      navigate("/petition")
  }
  navigate("/petition")

    } else{
      const msg = ['앗, 로그인이 필요합니다! 저희가 이동시켜 드릴게요.']
      alert(msg)
      navigate('/login');
    }

    
}


    return (
    <>
      {/* <div className='navBar'>
        <NavBar />
      </div> */}
      <p/>
      <div id='petitionCreate_title'>
      <h1>세상을 바꾸는 주인공이 될 수 있어요.</h1>
      </div>
      힘든 일 있으신가요? 주변에 도움이 필요한 사람이 있으신가요?
      <br></br>
      '정정당당'이 당신의 소중한 목소리를 전달해 드릴게요.
      <br></br>
      <br></br>
      이곳에서 청원을 작성하여 큰 변화의 시작을 우리와 함께할 수 있습니다.
      <p/>
      <div className='petition-create'>
        <br />

          <Form>
            <Form.Group as={Row} className="input-class" id="title-input-form">
              <Form.Label id="title-text"><h5>Title</h5>
              <div>
                <Form.Control
                  id='title-input'
                  type="text" placeholder="청원할 글의 제목을 작성해 주세요."
                  value={title} onChange={event => setTitle(event.target.value)}
                />
              </div>
              </Form.Label>
            </Form.Group>
            <br />
            <br />

            <Form.Group as={Row} className="input-url-class" id="url-input-form">
              <Form.Label id="url-text"><h5>Image</h5>
              <div>
                <Form.Control
                  id='url-input'
                  type="text" placeholder="게시할 사진의 URL을 붙여넣기 해주세요. 사진이 없으면 비워주세요. 기본 사진을 넣어 드릴게요."
                  value={photo_url} onChange={event => setURL(event.target.value)}
                />
              </div>
              </Form.Label>
            </Form.Group>

              <img src={photo_url} 
                  width = "600px"
                  className="rounded mx-auto d-block" alt="..."></img>
            <br />

            <Form.Group as={Row} className='input-class' id='content-input-form'>
              <Form.Label id='content-text'><h5>Content</h5>
                <div>
                  <Form.Control
                    id='content-input'
                    type='text' placeholder="청원 내용을 자세히 작성해 주세요."
                    value={content}
                    onChange={event => setContent(event.target.value)}
                  />
                </div>
              </Form.Label>
            </Form.Group>
 
        </Form>

          <Button className="btn" sx={{bgcolor: '#b68763', ':hover': {bgcolor: '#e8bb98'}}} variant="contained" id='confirm-button'
          onClick={() => clickCreateHanler()}>
          청원하기</Button>
      </div>
    </>
    )
}

export default PetitionCreatePage