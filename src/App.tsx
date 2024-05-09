import { BrowserRouter } from 'react-router-dom';
import Navbar from './widgets/Navbar';
import Router from './router/router';
import React from 'react'
import Footer from './widgets/footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Router />
      <Footer />
    </BrowserRouter>

  );
}

export default App;
