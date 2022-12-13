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
import PetitionDetailPage from './containers/PetitionDetailPage/PetitionDetailPage';
import NewsListPage from './containers/NewsListPage/NewsListPage';
import NewsDetailPage from './containers/NewsDetailPage/NewsDetailPage';
import QuoraListPage from './containers/QuoraListPage/QuoraListPage';
import QuoraDetailPage from './containers/QuoraDetailPage/QuoraDetailPage';
import PoliticianListPage from './containers/PoliticianListPage/PoliticianListPage';
import PoliticianDetailPage from './containers/PoliticianDetailPage/PoliticianDetailPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<MainPage content={<NewsListPage />} />} />
          <Route path="/login" element={<MainPage content={<LoginPage></LoginPage>} />} />
          <Route path="/user/:id" element={<MainPage content={<UserPage />} />} />
          <Route path="/signup" element={<MainPage content={<SignUpPage />} />} />
          <Route path="/petition" element={<MainPage content={<PetitionListPage />} />} />
          <Route path="/petition/create" element={<MainPage content={<PetitionCreatePage />}/>} />
          <Route path="/petition/:id" element={<MainPage content={<PetitionDetailPage />}/>} />
          <Route path="/news" element={<MainPage content={<NewsListPage />}/>} />
          <Route path="/news/:id" element={<MainPage content={<NewsDetailPage />}/>} />
          <Route path="/quora" element={<MainPage content={<QuoraListPage />}/>} />
          <Route path="/quora/:id" element={<MainPage content={<QuoraDetailPage />}/>} />
          <Route path="/politician" element={<MainPage content={<PoliticianListPage />}/>} />
          <Route path="/politician/:id" element={<MainPage content={<PoliticianDetailPage />}/>} />
          <Route path="/" element={<Navigate replace to={"/main"} />} />
          <Route path="*" element={<h1> Odiro Gaya Hajo Ajossi? </h1>} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
