import { Box, Button, Flex, Image, Stack } from '@chakra-ui/react'
import { FaGithub } from "react-icons/fa";
import React from 'react'
import theme from '../theme'
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
  const navigate = useNavigate();
  
  const navigateToChallengeList = () => {
    navigate('/challenge-list')
  }

  const redirect = () => {
    if(window.location.pathname !== '/') {
      navigate('/')
    }
  }

  return (
    <Stack
      ps={48}
      pt={4}
      pb={4}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1}
      bgGradient={`linear(to-b, ${theme.colors.blue[450]}, ${theme.colors.blue[400]})`}
      boxShadow="lg"
    >
      <Flex>
        <Image src={`${process.env.PUBLIC_URL}/quanc-logo.png`} width={'10%'} onClick={() => {navigate('/')}}/>
        <Flex justify={'space-between'} ms={4} mt={2}>
          <Box 
            ms={24} 
            color={'white'}
            _hover={{
              textDecoration: 'underline'
            }}
            onClick={redirect}
            >
            <HashLink 
            to='#about-us'
            smooth            >
              About Us
            </HashLink>
          </Box>
          <Box 
            ms={8} 
            color={'white'}
            _hover={{
              textDecoration: 'underline'
            }}
            onClick={redirect}
            >
            <HashLink 
            to='#faq'
            smooth
            >
              FAQ
            </HashLink>
          </Box>
          <Box>
            <Button
              variant={'link'}
              color={'white'}
              fontWeight={100}
              _hover={{
                textDecoration: 'underline'
              }}
              ms={8}
              >
              Collaborate with Us
            </Button>
          </Box>
        </Flex>
        <Box ms={96} ps={56}>
          <Button
            backgroundColor={theme.colors.blue[200]}
            color={'white'}
            fontWeight={100}
            _hover={{
              backgroundColor: theme.colors.blue[100],
            }}
            onClick={navigateToChallengeList}
            >
            Login with Github
            <Box ms={2}>
              <FaGithub />
            </Box>
          </Button>
        </Box>
      </Flex>
    </Stack>
  )
}

export default Navbar