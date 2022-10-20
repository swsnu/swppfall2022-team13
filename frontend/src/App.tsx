import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import MainPage from './containers/MainPage/MainPage';
import PetitionListPage from './containers/PetitionListPage/PetitionListPage';
import PetitionCreatePage from './containers/PetitionCreatePage/PetitionCreatePage';
import PetitionDetailPage from './containers/PetitionDetailPage/PetitionDetailPage';
import SurveyListPage from './containers/SurveyListPage/SurveyListPage';
import SurveyDetailPage from './containers/SurveyDetailPage/SurveyDetailPage';
import NewsListPage from './containers/NewsListPage/NewsListPage';
import NewsDetailPage from './containers/NewsDetailPage/NewsDetailPage';
import QuoraListPage from './containers/QuoraListPage/QuoraListPage';
import QuoraDetailPage from './containers/QuoraDetailPage/QuoraDetailPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          JUNGJUNG DANGDANG :D
        </a>
      </header>



      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/petition" element={<PetitionListPage />} />
          <Route path="/petition/create" element={<PetitionCreatePage />} />
          <Route path="/petition/:id" element={<PetitionDetailPage />} />
          <Route path="/survey" element={<SurveyListPage />} />
          <Route path="/survey/:id" element={<SurveyDetailPage />} />
          <Route path="/news" element={<NewsListPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/quora" element={<QuoraListPage />} />
          <Route path="/quora/:id" element={<QuoraDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
