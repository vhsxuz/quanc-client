import React from 'react';
import Landing from '../pages/Landing';

type Props = {};

const AuthMiddleware = (Component: React.ComponentType<Props>) => {
  const token = localStorage.getItem('accessToken');

  const AuthComponent = (props: Props) => {
    if (!token) {
      return <Landing />;
    }

    return <Component {...props} />;
  };

  return AuthComponent;
};

export default AuthMiddleware;