import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { useParams } from "react-router";
import { UserInfoBtnType } from "../../components/UserInfoBtn/UserInfoBtn";
import {
  fetchPolitician,
  PoliticianType,
  fetchPoliticians,
} from "../../store/slices/politician";
import { selectPolitician } from "../../store/slices/politician";
import { AppDispatch } from "../../store";
import UserInfoBtn from "../../components/UserInfoBtn/UserInfoBtn";
import "./PoliticianDetailPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "../../components/NavBar/NavBar";

const PoliticianDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchPolitician(Number(id)));
  }, [id]);
  const politicianState = useSelector(selectPolitician);
  const politician = politicianState.politicians.find((p) => {
    return p.id === Number(id);
  });
  useEffect(() => {
    dispatch(fetchPoliticians());
  }, []);
  // const politician = politicianContents[Number(id) - 1];
  return (
    <div className="PoliticianDetailPage">
      <NavBar />
      <div>
        <div className="left">
          <img
            src="https://media.istockphoto.com/photos/businessman-or-politician-making-speech-behind-the-pulpit-picture-id676327038?k=20&m=676327038&s=612x612&w=0&h=zb0yYF91voE-3-ar00zEjpG_HchV9LlpbCVPrErio1Q="
            width={300}
            height={370}
          />
          <h4 id="name">{politician.name + " " + politician.job}</h4>
          <p id="birth-date">{politician.birth_date}</p>
        </div>
        <div className="right">
          <div className="intro">
            <h2 id="intro-title">의원소개</h2>
          </div>
          <div className="education-and-career-header">
            <h4 id="intro-education-and-career">학력 및 경력</h4>
          </div>
          <div className="education-and-career-body">
            <p>
              {politician.career_summary
                .replaceAll("&middot;", "")
                .split("\r\n")
                .map((td) => {
                  if (td === "") return;
                  if (td.includes("학력") || td.includes("경력")) {
                    return <p id="mini-title">{td}</p>;
                  } else {
                    return <li>{td}</li>;
                  }
                })}
            </p>
          </div>
          {/* <div id="education-detail">
            <p id="education-title">[학력]</p>
            {politician.education.map((td) => {
              return <li>{td}</li>;
            })}
          </div>
          <div id="career-detail">
            <p id="career-title">[경력]</p>
            {politician.brief_histroy.map((td) => {
              return <li>{td}</li>;
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PoliticianDetailPage;
