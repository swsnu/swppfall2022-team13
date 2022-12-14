import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Quora, { QuoraType, } from "../../components/Quora/Quora";
import { AppDispatch } from "../../store";
import {
  fetchPoliticians,
  selectPolitician,
} from "../../store/slices/politician";
import { fetchQuoras, postQuora, selectQuora } from "../../store/slices/quora";
import "./QuoraListPage.css";
import Button from '@mui/material/Button';

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

  const clickOpenQuoraHandler = async () => {
    if (window.confirm("반가워요! 쿼라를 열까요?")) { 

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
            
            
          } 

          const msg2 = ['잘 하셨어요. 이제 목소리를 들을 준비가 되었답니다.']
          alert(msg2)
          window.location.reload()

        } else {
          const msg = ['앗, 정치인이 아니시군요! 이미 존재하는 쿼라에 참여해 주세요.']
          alert(msg)
        }
      } else {
        const msg = ['앗, 로그인이 필요합니다! 저희가 이동시켜 드릴게요.']
        alert(msg)
        navigate("/login")
      }
      
    }
  };


  return (
    <>
    <div>
    {/* <NavBar /> */}
    <div id="petitionList_title">
      <p></p><h1>'쿼라'를 열다. '국회'를 열다.</h1>
              </div>

              <img
                id="parliamentImg"
                src="https://open.assembly.go.kr/images/intro_img01.png"
              ></img>
              <br></br>
              <br></br>
            <b><h4>"좋은 세상을 바라는 평범한 시민이 모일 때 세상은 바뀐다”</h4></b>
            -Yuri Andreavich Zhivago
            
            <br></br>
            <br></br>
            <br></br>
            
          <p>
          '정정당당'의 쿼라는 시민이 진짜 주인이 되는 나라를 위해 만들어 졌습니다.
          <br></br>
          <br></br>
          <div id="petitionList_next">
          <p>국민이 물으면, 정치인이 답한다.</p>
          </div>
          쿼라를 통해 우리는 시민과 함께 약자와 소수자의 목소리에 귀 기울입니다.
          </p>
          이곳에서 시민은 합리적이고 타당한 비판 뿐 아니라 실현 가능한 대안까지 제시합니다. 
           <br></br>
           또 정치인은 국회 안에만 머무르지 않고 시민의 삶 가까이 필요한 각종 방안을 연구하고 제시합니다. 
          <br></br>
          <br></br>
          <br></br>
          정치인이신가요? 아래를 눌러 목소리를 들어 보세요.
          <p></p>
          <Button className="btn" sx={{bgcolor: '#b68763', ':hover': {bgcolor: '#e8bb98'}}} variant="contained" onClick={clickOpenQuoraHandler}><b>목소리 듣기</b></Button>
          
          <p></p>
          <p></p>
          <br></br>

          <div id="petitionList_next">
          <p>왜요? 혹시 무슨 일이 있나요?</p>
          </div>
          아래에서 원하는 정치인과 이야기를 시작해 보세요.
          <br></br>
          언제든 당신의 목소리를 전할 수 있답니다.
          <p></p>

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