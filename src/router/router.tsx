import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Landing from '../pages/Landing';
import ChallengeList from '../pages/ChallengeList';
import UploadCase from '../pages/UploadCase';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import AuthMiddleware from './middleware';
import ChallengeDetail from '../pages/ChallengeDetail';

const router = () => {

  const ChallengeListRoute = (props: any) => {
    const AuthComponent = AuthMiddleware(ChallengeList);
    return <AuthComponent {...props} />;
  };

  const ChallengeDetailRoute = (props: any) => {
    const AuthComponent = AuthMiddleware(ChallengeDetail as any);
    return <AuthComponent {...props} />;
  };
  
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/challenge-list" element={<ChallengeListRoute />} />
      <Route path="/challenge-detail/:id" element={<ChallengeDetailRoute />} />
      <Route path="/upload-case" element={<UploadCase />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  )
}

export default router