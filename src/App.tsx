import { BrowserRouter } from 'react-router-dom';
import Navbar from './widgets/Navbar';
import Router from './router/router';
import Footer from './widgets/footer';
import React, { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';

function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1366); // PC/laptop threshold

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1366); // Update based on new width
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isDesktop) {
    return <Text color={'white'}>Your device is not supported. Please use a Desktop.</Text>;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
