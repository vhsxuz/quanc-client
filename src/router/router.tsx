import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Landing from '../pages/Landing';
import ChallengeList from '../pages/ChallengeList';

const router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/challenge-list" element={<ChallengeList />} />
    </Routes>
  )
}

export default router