import { useNavigate, Link, Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'
import { useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import Quora, {QuoraType,} from "../../components/Quora/Quora";
import { fetchQuoras, selectQuora, deleteQuora, postQuora } from "../../store/slices/quora";
import { AppDispatch } from "../../store";
import axios from 'axios';
import {
  fetchPoliticians,
  selectPolitician,
} from "../../store/slices/politician";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  
const QuoraListPage = () => {
  const navigate = useNavigate();
  const quoraState = useSelector(selectQuora);
  const dispatch = useDispatch<AppDispatch>();
  const politicianState = useSelector(selectPolitician);

  useEffect(() => {
    dispatch(fetchQuoras());
    dispatch(fetchPoliticians());
    console.log("this is state: " + quoraState)
    
  }, []);  
  
  //AFTER PROPER BACKEND

  const [quoras, setLeftContents] = useState<
    QuoraType[]
  >([
    {
      id: 1,
      title:
        "앙 기모찌",
      content:
        "앙앙 기모찌",
      author: 1,
    },
    {
      id: 2,
      title:
        "this is test 2",
      content:
        "hello world!",
      author: 2,
    },

  ]);

  const clickOpenQuoraHandler = async () => {
    if (window.confirm("Are you sure?")) { 

      const response = await axios.get("/api/user/islogin/");
      console.log("Login status: ", response.data);
      const isLogin = response['data']['status'];

      if(isLogin && response.data.id !== 2){
      const user_email = response.data.email;
      const user_id = response['data']['id'];
      console.log(user_email)
      const isPolitician = true //SHOULD BE IMPROVED WHEN POLITICIAN IS MADE
      const politician = politicianState.politicians.find((value:any) => value.email === user_email);
      //const politician2 = politicianState.politicians.at(politicianState.politicians.length-1);
      //console.log("politician email :" + politician2.email)
      console.log("politician match? :" + politician)

        if (politician) { //SHOULD BE IMPROVED WHEN POLITICIAN IS MADE

          //const politicianName = politician.name 
          const QuoraData = {
            title: politician.name,
            content: "This is online Quora of: " + politician.name,
            author: user_id,
            author_politicianId: politician.id,

            //title: "허경영",
            //content: "This is online Quora of: " + "허경영",
            //author: 1,
          }
          console.log("quora opened with politician id:" + politician.id)
      
          const responseQuora = await dispatch(postQuora(QuoraData))
      
          if (responseQuora.type === `${postQuora.typePrefix}/fulfilled`) {
            
            const msg2 = ['Quora Opened!']
            alert(msg2)
            navigate("/quora")
          } 

        } else {
          const msg = ['Politician ID Required']
          alert(msg)
          navigate("/quora")
        }
      } else {
        const msg = ['Login Required']
        alert(msg)
        navigate("/login")
      }
      
    }
  };


  return (
    <>
    <div>
    {/* <NavBar /> */}
      <h1>QUORA LIST</h1>

          <p>
          This is our list of Opened Quoras!
          </p>
          <button className="quoraTitle" type="button" onClick={clickOpenQuoraHandler}><b>Open Quora</b></button>
          
        <div className="row">
                <div className="col-sm-6">
                  <div className="LeftNews">

                      {quoraState.quoras.map((td: any) => {
                            return (
                              <Quora
                                key={`${td.id}_todo`}
                                id={td.id}
                                title={td.title}
                                content={td.content}
                                author={td.author}
                                author_politicianId={td.author_politicianId}

                              />
                            );

                    })}
                    </div>
                  </div>

          </div>
    </div>

    
    </>
  );
}

export default QuoraListPage