import { Box, Button, Flex, Image, Stack } from '@chakra-ui/react'
import { FaGithub } from "react-icons/fa";
import React, { useCallback, useEffect, useState, createContext } from 'react'
import theme from '../theme'
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import axios from 'axios';

interface githubUserData {
  login?: string,
  id?: string,
  node_id?: string,
  avatar_url?: string,
  url?: string,
  user_role?: string,
}

const Navbar = () => {
  const navigate = useNavigate()
  const [renderer, setRenderer] = useState(false)
  const [userData, setUserData] = useState<githubUserData>({})
  const [userRole, setUserRole] = useState<string | null>(null);
  const accessToken = localStorage.getItem('accessToken');
  var codeParam: string | null;

  const getAccessToken = useCallback(async () => {

    if(codeParam === null || accessToken) {
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/getAccessToken?code=" + codeParam, {
        method: "GET"
      });
      console.log(response)
      if (!response) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.data;

      if (data.access_token) {
        localStorage.setItem('accessToken', data.access_token);
        setRenderer(!renderer);
        getUserData()
        navigate('/challenge-list/');
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  }, [])
  
  async function getUserData() {
    try {
      const response = await fetch('http://localhost:8000/getUserData', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      const data = await response.json();
      console.log(data.data.id)
      setUserData(data.data)
      setUserRole(data.data.app_data.role)
      addUser(data.data.id)
    } catch (error) {
      console.error(error);
    }
  }

  const navigateToCollaborate = () => {
    navigate('/collaborate/')
  }

  const redirect = () => {
    if(window.location.pathname !== '/') {
      navigate('/')
    }
  }

  const addUser = (githubId: string) => {

    let data = JSON.stringify({
      "github_id": githubId
    });
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/addUser',
      headers: { 
        'Authorization': `Bearer ${accessToken}`, 
        'Content-Type': 'application/json'
      },
      data: data
    };
  
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigateToChallengeList = () => {
    navigate('/challenge-list/');
  }

  const navigateToUploadCase = () => {
    navigate('/upload-case/')
  }

  function login() {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + process.env.REACT_APP_CLIENT_ID);
  }

  function logout() {
    localStorage.removeItem('accessToken')
    setRenderer(!renderer)
    navigate('/')
  }

  useEffect(() => {
    const queryString = window.location.search
    const urlSearchParam = new URLSearchParams(queryString)
    codeParam = urlSearchParam.get('code')
    
    getAccessToken()
    if (accessToken) {
      getUserData();
    }


  }, [getAccessToken])

  return (
    <Stack
      ps={4}
      pt={4}
      pb={4}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1}
      bgGradient={`linear(to-b, ${theme.colors.blue[450]}, ${theme.colors.blue[400]})`}
      boxShadow="lg"
      spacing={0}
      direction="row"
      align="center"
    >
      <Flex align="center" flex={1} pr={0}>
        <Image src={`${process.env.PUBLIC_URL}/quanc-logo.png`} width={'40%'} onClick={() => { navigate('/'); }} />
      </Flex>
      <Flex
        align="left"
        flex={3}
        direction={{ base: 'column', md: 'row' }}
        gap={8}
        wrap="wrap"
      >
        <Box 
          color={'white'}
          _hover={{ textDecoration: 'underline' }}
          onClick={redirect}
        >
          <HashLink to='#about-us' smooth>
            About Us
          </HashLink>
        </Box>
        <Box 
          color={'white'}
          _hover={{ textDecoration: 'underline' }}
          onClick={redirect}
        >
          <HashLink to='#faq' smooth>
            FAQ
          </HashLink>
        </Box>
        <Box>
          <Button
            variant={'link'}
            color={'white'}
            fontWeight={100}
            _hover={{ textDecoration: 'underline' }}
            onClick={navigateToCollaborate}
          >
            Collaborate with Us
          </Button>
          {accessToken &&
            <>
              <Button
                variant={'link'}
                color={'white'}
                fontWeight={100}
                _hover={{ textDecoration: 'underline' }}
                onClick={navigateToChallengeList}
                ms={8}
              >
                Challenge List
              </Button>
              {userRole === 'admin' &&
                <Button
                  variant={'link'}
                  color={'white'}
                  fontWeight={100}
                  _hover={{ textDecoration: 'underline' }}
                  onClick={navigateToUploadCase}
                  ms={8}
                >
                  Upload Case
                </Button>
              }
            </>
          }
        </Box>
      </Flex>
      <Flex
        align="center"
        flex={1}
        justify="flex-end"
      >
        {accessToken ?
          <Button
            backgroundColor={theme.colors.blue[200]}
            color={'white'}
            fontWeight={100}
            _hover={{ backgroundColor: theme.colors.blue[100] }}
            onClick={logout}
            me={4}
          >
            Logout
          </Button>
          :
          <Button
            backgroundColor={theme.colors.blue[200]}
            color={'white'}
            fontWeight={100}
            _hover={{ backgroundColor: theme.colors.blue[100] }}
            onClick={login}
            me={4}
          >
            <Box me={2}>
              <FaGithub />
            </Box>
            Login with Github
          </Button>
        }
      </Flex>
    </Stack>
  )
}

export default Navbar