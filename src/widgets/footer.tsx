import { Box, Button, Divider, Flex, Heading, Image, Link, Stack, Text, theme } from '@chakra-ui/react'
import React from 'react'
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'

const Footer = () => {
  const navigate = useNavigate();

  const redirect = () => {
    if(window.location.pathname !== '/') {
      navigate('/')
    }
  }

  const navigateToPrivacyPolicy = () => {
    navigate('/privacy-policy')
  }

  return (
    <Stack
      as="footer"
      ps={64}
      pb={8}
      position={'absolute'} 
      bottom={0}
      width={'100%'}
    >
      <Flex justify={'space-between'}>
        <Flex mt={16}>
          <Stack>
            <Heading color={'white'} fontSize={'medium'} mb={8}>
              Content
            </Heading>
            <Box color={'white'} textDecoration={'underline'} onClick={redirect} mb={8}>
              <HashLink to='#about-us' smooth >
                About Us
              </HashLink>
            </Box>
            <Box color={'white'} textDecoration={'underline'} onClick={redirect} mb={8}>
              <HashLink to='#faq' smooth >
                FAQ
              </HashLink>
            </Box>
            <Box color={'white'} textDecoration={'underline'} onClick={redirect} mb={8}>
              <HashLink to='#' smooth >  
                Collaborate with Us
              </HashLink>
            </Box>
          </Stack>
        <Stack ms={4}>
          <Heading color={'white'} fontSize={'medium'} mb={8}>
            Policies
          </Heading>
          <Button variant={'link'} onClick={navigateToPrivacyPolicy} color={'white'} fontWeight={'100'} textDecoration={'underline'}>
            Privacy Policy
          </Button>
        </Stack>
        </Flex>

        <Stack>
            <Image src={`${process.env.PUBLIC_URL}/quanc-logo.png`} width={'45%'}/>
            <Text textAlign={'left'} color={'white'} mt={4} >
            If you have a question about <br />
            our platform, business or press <br />
            enquiries, please get in touch <br />
            via the email address below. <br />
            </Text>
            
            <Link href='mailto:project.quanc@gmail.com' mt={8} mb={8}>
              <Button variant={'link'} color={theme.colors.cyan[400]} fontWeight={100}>
                <Box me={2}>
                  <IoMdMail />
                </Box>
                project.quanc@gmail.com
              </Button>
            </Link>

            <Divider width={'24vw'}/>

            <Flex mt={4}>
              <Link href='#' scrollBehavior={'smooth'}>
                <Image src={`${process.env.PUBLIC_URL}/quanc-logo-inv.png`} width={'36px'}/>
              </Link>
              <Link href='https://discord.gg/5ZUsk7q5vq' ms={4} >
                <FaDiscord color={'white'} fontSize={'36px'}/>
              </Link>
              <Link href='https://github.com/vhsxuz/quanc-client' ms={4}>
                <FaGithub color={'white'} fontSize={'36px'}/>
              </Link>
            </Flex>

            <Text color={'white'} mt={4}>
              @ Copyright 2024 Quan C. All rights reserved
            </Text>
          </Stack>
      </Flex>
    </Stack>
  )
}

export default Footer