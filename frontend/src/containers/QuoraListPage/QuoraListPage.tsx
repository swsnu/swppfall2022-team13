import { useNavigate, Link, Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'
import { useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import Quora, {QuoraType,} from "../../components/Quora/Quora";
import { fetchQuoras, selectQuora, deleteQuora, postQuora } from "../../store/slices/quora";
import { AppDispatch } from "../../store";

  
const QuoraListPage = () => {
  const navigate = useNavigate();
  const quoraState = useSelector(selectQuora);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchQuoras());
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
    if (window.confirm("Are you sure?")) { //Until Proper User Implementation -> only POLITICIAN should create
      const politicianName = "허경영" //Until Proper User Implementation -> find politician name based on ID
      const QuoraData = {
        title: politicianName,
        content: "This is online Quora of: " + politicianName,
        author: 1, //Until Proper User Implementation
      }
  
      const responseQuora = await dispatch(postQuora(QuoraData))
  
      if (responseQuora.type === `${postQuora.typePrefix}/fulfilled`) {
        const msg2 = ['Quora Opened!']
        alert(msg2)
        navigate("/quora")
    } 
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