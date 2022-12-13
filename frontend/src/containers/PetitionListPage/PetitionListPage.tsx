import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Petition, { PetitionType, } from "../../components/Petition/Petition";
import { AppDispatch } from "../../store";
import { fetchPetitions, selectPetition } from "../../store/slices/petition";
import "./PetitionListPage.css";

  
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
      const msg = ['앗, 로그인이 필요합니다! 저희가 이동시켜 드릴게요.']
      alert(msg)
      navigate('/login');
    }
  };


  return (
    <>
    <div>
    {/* <NavBar /> */}

      <div id="petitionList_title">
      <p></p><h1>앞서서 세상을 바꿔온 '정정당당 청원' 입니다</h1>
              </div>
              <br></br>
            <b><h4>"우리가 물으면 세상이 답한다. 나가서 세상에 물어라”</h4></b>
            -Catherine Von Delahaye
            
            <br></br>
            <br></br>
            <br></br>
            
          <p>
          '정정당당'의 청원은 온 세상이 우리의 이야기를 직접 듣고, 소통하고자 하는 작은 소망에서 탄생하였습니다.
          <br></br>
          그리고 이 공간에서 우리가 직접 올린 호소에 많은 사람들이 ‘동의’를 표하며, 큰 변화를 만들어갈 수 있습니다.
          </p>
          <p>
            ~ ~
            <br></br>
          “소방공무원을 국가직으로 전환해주세요.”
          <br></br>
          “청소노동자들이 화장실에서 식사하지 않도록 휴게공간 보장, 의무화해주세요”
          <br></br>
          “초소형 카메라를 판매금지해주세요”
          <br></br>
          “GMO 완전 표시제 이행을 촉구합니다”
          <br></br>
          “권역외상센터 추가적, 제도적, 환경적, 인력 지원요청”
          <br></br>
          “대주주 양도소득세는 폐기되어야 합니다”
          <br></br>
          ~ ~
          </p>
           '정정당당'의 청원은 우리들 한 명 한 명의 구성원으로부터 비롯됩니다. 
           <br></br>
          청소노동자·비혼모 등 사회적 약자를 위한 제도개선 청원도, 정부와 지자체 등에서 진행되는 제도에 대한 찬반 청원도 좋습니다.
          <br></br>
          아래를 눌러, 정부와 사회가, 그리고 우리가 다시 한번 각종 의제들을 살펴보고, 개선 필요성을 검토하는 중요한 계기를 만들어주세요.
          <p></p>
          <button className="btn btn-outline-success" type="submit" onClick = {onClickRaise}>청원 올리기</button>
          <div id="Petitions">
          
          <p></p>
          <p></p>

          <div id="petitionList_next">
          <p>아래에서 많은 청원이 당신을 기다립니다</p>
          </div>
          당신이 가져올 수 있는 세상의 변화를 확인하세요.
          <p></p>
              </div>
          
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