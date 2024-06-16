import React, { useEffect, useState } from 'react';
import Landing from '../pages/Landing';

type Props = {};

const AdminMiddleware = (Component: React.ComponentType<Props>) => {
  const AuthComponent = (props: Props) => {
    const token = localStorage.getItem('accessToken');
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:8000/getUserData', {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }

          const data = await response.json();
          const role = data.data.app_data.role;
          setUserRole(role);
        } catch (error) {
          console.error(error);
        }
      };

      if (token) {
        fetchUserData();
      }
    }, [token]);

    if (!token || userRole !== 'admin') {
      return <Landing />;
    }

    return <Component {...props} />;
  };

  return AuthComponent;
};

export default AdminMiddleware;
