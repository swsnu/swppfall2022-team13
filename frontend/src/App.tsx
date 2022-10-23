import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import MainPage from './containers/MainPage/MainPage';
import UserPage from './containers/UserPage/UserPage';
import SignUpPage from './containers/SignUpPage/SignUpPage';
import LoginPage from './containers/LoginPage/LoginPage';
import PetitionListPage from './containers/PetitionListPage/PetitionListPage';
import PetitionCreatePage from './containers/PetitionCreatePage/PetitionCreatePage';
import PetitionEditPage from './containers/PetitionEditPage/PetitionEditPage';
import PetitionDetailPage from './containers/PetitionDetailPage/PetitionDetailPage';
import SurveyListPage from './containers/SurveyListPage/SurveyListPage';
import SurveyCreatePage from './containers/SurveyCreatePage/SurveyCreatePage';
import SurveyDetailPage from './containers/SurveyDetailPage/SurveyDetailPage';
import NewsListPage from './containers/NewsListPage/NewsListPage';
import NewsDetailPage from './containers/NewsDetailPage/NewsDetailPage';
import QuoraListPage from './containers/QuoraListPage/QuoraListPage';
import QuoraDetailPage from './containers/QuoraDetailPage/QuoraDetailPage';
import PoliticianListPage from './containers/PoliticianListPage/PoliticianListPage';
import PoliticianDetailPage from './containers/PoliticianDetailPage/PoliticianDetailPage';



function App() {

  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/petition" element={<PetitionListPage />} />
          <Route path="/petition/create" element={<PetitionCreatePage />} />
          <Route path="/petition/edit" element={<PetitionEditPage />} />
          <Route path="/petition/:id" element={<PetitionDetailPage />} />
          <Route path="/survey" element={<SurveyListPage />} />
          <Route path="/survey/create" element={<SurveyCreatePage />} />
          <Route path="/survey/:id" element={<SurveyDetailPage />} />
          <Route path="/news" element={<NewsListPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/quora" element={<QuoraListPage />} />
          <Route path="/quora/:id" element={<QuoraDetailPage />} />
          <Route path="/politician" element={<PoliticianListPage />} />
          <Route path="/politician/:id" element={<PoliticianDetailPage />} />
          <Route path="/" element={<Navigate replace to={"/main"} />} />
          <Route path="*" element={<h1> Odiro Gaya Hajo Ajossi? </h1>} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
