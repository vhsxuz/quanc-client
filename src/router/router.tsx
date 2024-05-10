import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Landing from '../pages/Landing';
import ChallengeList from '../pages/ChallengeList';
import UploadCase from '../pages/UploadCase';
import PrivacyPolicy from '../pages/PrivacyPolicy';

const router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/challenge-list" element={<ChallengeList />} />
      <Route path="/upload-case" element={<UploadCase />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  )
}

export default router