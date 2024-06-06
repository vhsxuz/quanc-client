import React, { useEffect, useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import Landing from '../pages/Landing';
import ChallengeList from '../pages/ChallengeList';
import UploadCase from '../pages/UploadCase';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import AuthMiddleware from './middleware';
import ChallengeDetail from '../pages/ChallengeDetail';
import Collaborate from '../pages/Collaborate';
import ViewLog from '../pages/ViewLog';

const router = () => {

  const ChallengeListRoute = (props: any) => {
    const AuthComponent = AuthMiddleware(ChallengeList);
    return <AuthComponent {...props} />;
  };

  const ChallengeDetailRoute = (props: any) => {
    const AuthComponent = AuthMiddleware(ChallengeDetail as any);
    return <AuthComponent {...props} />;
  };

  const ViewLogRoute = (props: any) => {
    const AuthComponent = AuthMiddleware(ViewLog as any);
    return <AuthComponent {...props} />;
  };

  const UploadCaseRoute = (props: any, ) => {
    const userRole = getUserData();
    console.log(userRole)
    const AuthComponent = AuthMiddleware(UploadCase as any);
    return <AuthComponent {...props} />;
  };

  const getUserData = async () => {
    try {
      const response = await fetch('http://localhost:8000/getUserData', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      const userRole = data.data.app_data.role
      return userRole;
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/challenge-list" element={<ChallengeListRoute />} />
      <Route path="/challenge-detail" element={<ChallengeDetailRoute />} />
      <Route path="/view-log" element={<ViewLogRoute />} />
      <Route path="/upload-case" element={<UploadCaseRoute />} />
      <Route path="/collaborate" element={<Collaborate />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
};

export default router