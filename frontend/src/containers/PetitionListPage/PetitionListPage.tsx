import { useNavigate, Link, Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'
import { useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import Petition, {PetitionType,} from "../../components/Petition/Petition";
import { fetchPetitions, selectPetition, deletePetition, postPetition } from "../../store/slices/petition";
import { AppDispatch } from "../../store";
import axios from 'axios';

  
const PetitionListPage = () => {
  const navigate = useNavigate();
  const petitionState = useSelector(selectPetition);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPetitions());
    console.log("this is state: " + petitionState)
  }, []);  
  
  //AFTER PROPER BACKEND

  const [petitions, setLeftContents] = useState<
    PetitionType[]
  >([
    {
      id: 1,
      title:
        "앙 기모찌",
      content:
        "앙앙 기모찌",
      author: 1,
      vote: 100,
    },
    {
      id: 2,
      title:
        "this is test 2",
      content:
        "hello world!",
      author: 2,
      vote: 300,
    },

  ]);

  const onClickRaise = async () => {

    const response = await axios.get("/api/user/islogin/");
    console.log("Login status: ", response.data);
    const isLogin = response['data']['status'];

    if(isLogin && response.data.id !== 2){
      const user_id = response['data']['id'];
      navigate("/petition/create");
    } else{
      const msg = ['Login Required']
      alert(msg)
      navigate('/login');
    }
  };


  return (
    <>
    <div className = "background_list">
    <NavBar />
      <h1>PETITIONS LIST</h1>

          <p>
          We have some petitions for you
          </p>
          <p><button className="petitonTitle" type="button" onClick={onClickRaise}><b>Raise Petition</b></button></p>
          
                  <div className="petitionsMap">

                      {petitionState.petitions.map((td: any) => {
                            return (
                              <Petition
                                key={`${td.id}_todo`}
                                id={td.id}
                                title={td.title}
                                content={td.content}
                                author={td.author}
                                vote={td.vote}
                                photo_url={td?.photo_url}

                              />
                            );

                    })}
                    </div>
                   
                  </div>


    
    </>
  );
}

export default PetitionListPage