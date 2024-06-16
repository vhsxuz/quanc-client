import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import ChallengeList from '../pages/ChallengeList';
import UploadCase from '../pages/UploadCase';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import AuthMiddleware from './middleware';
import ChallengeDetail from '../pages/ChallengeDetail';
import Collaborate from '../pages/Collaborate';
import ViewLog from '../pages/ViewLog';
import { error } from 'console';
import AdminMiddleware from './adminMiddleware';

const waitForAccessToken = async (interval = 100, timeout = 5000) => {
  const startTime = Date.now();

  const checkToken = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return token;
    }
    if (Date.now() - startTime >= timeout) {
      throw new Error('Timed out waiting for access token');
    }
    return null;
  };

  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      const token = checkToken();
      if (token) {
        clearInterval(intervalId);
        resolve(token);
      }
    }, interval);
  });
};

const RouterComponent = () => {

  const ChallengeListRoute = (props: any) => {
    const AuthComponent = AuthMiddleware(ChallengeList as any);
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

  const UploadCaseRoute = (props: any) => {
    const AuthComponent = AdminMiddleware(UploadCase as any);
    return <AuthComponent {...props} />;
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

export default RouterComponent;
