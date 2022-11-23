
import { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Button, Form, InputGroup, Row } from 'react-bootstrap'
import { useDispatch,  } from 'react-redux'
import { useNavigate } from 'react-router'
import { postPetition } from "../../store/slices/petition";
import { AppDispatch } from "../../store";

const PetitionCreatePage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [photo_url, setURL] = useState('')
  const [author, setAuthor] = useState(1) //Until Proper user Implementation

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const logged_in = true //Until Proper user Implementation


  const clickConfirmCreateHanler = async () => {
    if (!logged_in) {
      navigate('/login')
      return
    }

    const validationCheckList = [title, content]
    const validationMessages = ['title', 'content']

    if (validationCheckList.some(value => !value)) {
      const msg = ['Invalid input for:']
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
      author: 1, //Until Proper User Implementation
      vote: 0,
      photo_url: photo_url
    }
    
    if(photo_url==='') {
      petitionData.photo_url = 'http://monthly.chosun.com/upload/2109/2109_386.jpg'
    }

    const responsePetition = await dispatch(postPetition(petitionData))

    if (responsePetition.type === `${postPetition.typePrefix}/fulfilled`) {
      const msg2 = ['Petition Created!']
      alert(msg2)
      navigate("/petition")
  }
  navigate("/petition")
}


    return (
    <>
      <div className='navBar'>
        <NavBar />
      </div>
      <p/>
      <h1>Petition Create Page</h1>
      <p/>
      <div className='petition-create'>
        <br />

          <Form>
            <Form.Group as={Row} className="input-class" id="title-input-form">
              <Form.Label id="title-text"><h5>Title</h5>
              <div>
                <Form.Control
                  id='title-input'
                  type="text" placeholder="fill in your petition title"
                  value={title} onChange={event => setTitle(event.target.value)}
                />
              </div>
              </Form.Label>
            </Form.Group>
            <br />
            <br />

            <Form.Group as={Row} className="input-url-class" id="url-input-form">
              <Form.Label id="url-text"><h5>Title</h5>
              <div>
                <Form.Control
                  id='url-input'
                  type="text" placeholder="fill in your photo's URL"
                  value={photo_url} onChange={event => setURL(event.target.value)}
                />
              </div>
              </Form.Label>
            </Form.Group>
            <br />
            <br />

            <Form.Group as={Row} className='input-class' id='content-input-form'>
              <Form.Label id='content-text'><h5>Content</h5>
                <div>
                  <Form.Control
                    id='content-input'
                    type='text' placeholder="fill in your petition content"
                    value={content}
                    onChange={event => setContent(event.target.value)}
                  />
                </div>
              </Form.Label>
            </Form.Group>
 
        </Form>
        <Button
          id='confirm-button'
          type="button"
          onClick={() => clickConfirmCreateHanler()}>
          Create
        </Button>
      </div>
    </>
    )
}

export default PetitionCreatePage