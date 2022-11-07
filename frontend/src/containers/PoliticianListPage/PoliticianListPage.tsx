import PoliticianSummary from "../../components/PoliticianSummary/PoliticianSummary";
import { useState } from "react";
import { PoliticianSummaryType } from "../../components/PoliticianSummary/PoliticianSummary";
import UserInfoBtn from "../../components/UserInfoBtn/UserInfoBtn";
import { UserInfoBtnType } from "../../components/UserInfoBtn/UserInfoBtn";
import "./PoliticianListPage.css";
import KitchenSinkExample from "../../components/PoliticianSummary/PoliticianSummary";

const PoliticianListPage = () => {
  const userInfoBtnContent: UserInfoBtnType = {
    url: "/user/1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3qAb5Xu6-hZguic1bPpFbicnmwOlHHIQ_ANoaY1xcLwrHfem6M1mNZkspUnq4u4DgjWs&usqp=CAU",
  };
  const [PoliticianSummarys, setPoliticianSummarys] = useState<
    PoliticianSummaryType[]
  >([
    {
      id: 1,
      image:
        "https://w.namu.la/s/7fa96328b016045de860e50a28fb1dff92f95d918ee78949dd3d1a0e82d662a90f36e390694889338e7a1b694f99b6b9801fa4d117f8f39ce8834d4bdc438663799947ba3e0e14e971ab401d597c2e39419b83d46220a14fe6043860f946a061010385fe853b5389d0921c3682febc37",
      name: "윤석열",
      birthdate: "1960년 12월 18일",
      politicalParty: "국민의힘",
      position: "제20대 대통령",
    },
    {
      id: 2,
      image:
        "https://w.namu.la/s/6d13dd480dca33f2c79792ae6cafcc5cb2e4fa1af280543e2d5012121e0e2650e8443e95624dbaffc44bc6e2d90d16db87984a543efe8997976e06514ebc9e3ec7ef080fecc4418243a3b5ba024e124b37e07851b6bad8f7c8790ed9889fab87c66b6013a25fa2e7681e77c07255ef12",
      name: "홍준표",
      birthdate: "1953년 11월 20일",
      politicalParty: "국민의힘",
      position: "대구광역시장",
    },
    {
      id: 3,
      image:
        "https://w.namu.la/s/76269aed70307c98e6351da3cede176b8637b6ef533fc4e9b8947711398871df8d4c2ab94912125395bdcf21961a3a832a90ffa3bbfffc6a94bbbc8bb8f61f7f4fa8d84a01a35b285648dc7e026ce101c83ccacfdbe8f3694c6ceefcf9c91c109e2ebc1885eea002abd2c22ddc92fbd9",
      name: "이재명",
      birthdate: "1963년 12월 8일",
      politicalParty: "더불어민주당",
      position: "제21대 국회의원",
    },
    {
      id: 4,
      image:
        "https://w.namu.la/s/49fb0e8ded55533fa9d1773d1d43d75f672f19150d93c90578c7f8d50acca477efbfaecc78e8e04339ff2678910a7b605b8792bf16e904ba50ea3b626160a1dd2f31c709d85898a8eb390221f32dcecb93bdeacb5ed1cfb35da271eb573d123b10b4b3534024d87bc152de08ca741955",
      name: "원희룡",
      birthdate: "1964년 2월 14일",
      politicalParty: "국민의힘",
      position: "제7대 국토교통부장관",
    },
  ]);
  return (
    <div className="PoliticianListPage">
      <UserInfoBtn
        url={userInfoBtnContent.url}
        image={userInfoBtnContent.image}
      />
      <div className="PoliticianSummarys">
        {PoliticianSummarys.map((data) => {
          return (
            <div className="SummaryComponent">
              <KitchenSinkExample
                id={data.id}
                image={data.image}
                name={data.name}
                birthdate={data.birthdate}
                politicalParty={data.politicalParty}
                position={data.position}
              />
            </div>
            // <PoliticianSummary
            // id={data.id}
            // image={data.image}
            // name={data.name}
            // birthdate={data.birthdate}
            // politicalParty={data.politicalParty}
            // position={data.position}
            // />
          );
        })}
      </div>
    </div>
  );
};

export default PoliticianListPage;
