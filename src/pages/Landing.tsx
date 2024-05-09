import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button, Flex, Heading, Image, Link, Stack, Text } from '@chakra-ui/react'
import theme from '../theme'
import { FaDiscord, FaGit, FaGithub, FaMinus, FaPlus } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import React from 'react'
import '@fontsource/lexend/400.css';
import '@fontsource/lexend/500.css';
import { useNavigate } from 'react-router-dom';


const Landing = () => {

  const navigate = useNavigate();
  
  const navigateToChallengeList = () => {
    navigate('/challenge-list')
  }

  return (
    <Stack position={'relative'} minHeight={'80vh'}>
      {/* Content 1 */}
      <Stack pt={48} pb={24} color={'white'} textAlign={'center'} bgGradient={`linear(to-t, ${theme.colors.blue[600]}, ${theme.colors.blue[400]})`}>
        <Heading fontSize={'96px'} fontStyle={'normal'}>
          Build Unbreakable <br />
        </Heading>
        <Heading fontSize={'96px'} fontStyle={'normal'} color={theme.colors.cyan[100]}>
          Code
        </Heading>
        <Text 
        fontSize={'xl'}
        mt={8}>
          Building secure applications shouldn't be a headache. <br />
          Quan C is your interactive platform designed to make learning <br />
          secure programming practices fun, engaging, and effective.
        </Text>
        <Stack alignItems={'center'}>
          <Button
              backgroundColor="transparent"
              border={`1px solid ${theme.colors.cyan[100]}`}
              color={theme.colors.cyan[100]}
              fontWeight={100}
              width="400px"
              mt={16}
              pt={8}
              pb={8}
              _hover={{
                backgroundColor: theme.colors.cyan[100],
                color: "black",
              }}
              onClick={navigateToChallengeList}
            >
            Join Now Using Github
            <Box ms={2}>
              <FaGithub />
            </Box>
          </Button>
        </Stack>
      </Stack>

      {/* Content 2 */}
      <Stack id="about-us" color={'white'} pt={32} alignItems={'center'} backgroundColor={theme.colors.blue[700]}>
        <Heading textDecor={'normal'} fontSize={'6xl'} fontWeight={100}>
          About Us
        </Heading>

        <Flex alignItems={'center'} pb={24}>
          <Image src={`${process.env.PUBLIC_URL}/quanc-logo-2.png`} width={'35%'} ms={32}/>
          <Text textAlign={'left'} ms={8} fontSize={'x-large'}>
            Quan C is your interactive <br />
            platform designed to make <br />
            learning secure programming <br />
            practices fun, engaging, and<br />
            effective. <br />
          </Text>
        </Flex>
      </Stack>

      {/* Content 3 */}
      <Stack id="faq" bgGradient={`linear(to-b, ${theme.colors.blue[700]}, ${theme.colors.blue[400]})`}>
        <Stack alignItems={'center'}>
          <Heading pt={36} color={'white'} textAlign={'center'} fontWeight={100} fontSize={'6xl'}>
            Frequently Asked Questions
          </Heading>
        </Stack>
        <Stack mt={24} mb={24}>
          <Stack>
            <Accordion allowMultiple allowToggle>  
              <Flex justify={'space-evenly'}>
                <Stack>
                  <AccordionItem
                    backgroundColor={theme.colors.blue[700]} 
                    pt={6} pb={6} 
                    border={`1px solid ${theme.colors.cyan[100]}`} 
                    borderRadius={24}
                    width={'26vw'}
                  >
                    {({ isExpanded }) => (
                      <>
                        <h2>
                          <AccordionButton>
                            <Box as='span' me={8} flex='1' textAlign='left' color={theme.colors.cyan[100]}>
                              Is Quan C suitable for my skill level ?
                            </Box>
                            {isExpanded ? (
                              <FaMinus fontSize='12px' color={theme.colors.cyan[100]}/>
                            ) : (
                              <FaPlus fontSize='12px' color={theme.colors.cyan[100]} />
                            )}
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} color={'white'} width={'26vw'}>
                        Quan C is ideal for intermediate and advanced developers who already have a solid coding foundation and want to
                        deep-dive into secure coding principles.
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                </Stack>
                <Stack>
                  <AccordionItem
                    backgroundColor={theme.colors.blue[700]} 
                    pt={6} pb={6} 
                    border={`1px solid ${theme.colors.cyan[100]}`} 
                    borderRadius={24}
                    width={'26vw'}
                  >
                    {({ isExpanded }) => (
                      <>
                        <h2>
                          <AccordionButton>
                            <Box as='span' me={8} flex='1' textAlign='left' color={theme.colors.cyan[100]}>
                            What kind of challenges does Quan C offer ?
                            </Box>
                            {isExpanded ? (
                              <FaMinus fontSize='12px' color={theme.colors.cyan[100]}/>
                            ) : (
                              <FaPlus fontSize='12px' color={theme.colors.cyan[100]} />
                            )}
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} color={'white'} width={'26vw'}>
                        We provide real-world, scenario-based coding exercises that push your boundaries and allow you to apply your knowledge to practical security threats.
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                </Stack>
              </Flex>

              <Flex justify={'space-evenly'} mt={16}>
                <Stack>
                  <AccordionItem
                    backgroundColor={theme.colors.blue[700]} 
                    pt={6} pb={6} 
                    border={`1px solid ${theme.colors.cyan[100]}`} 
                    borderRadius={24}
                    width={'26vw'}
                  >
                    {({ isExpanded }) => (
                      <>
                        <h2>
                          <AccordionButton>
                            <Box as='span' me={8} flex='1' textAlign='left' color={theme.colors.cyan[100]}>
                              Can I learn at my own pace ?
                            </Box>
                            {isExpanded ? (
                              <FaMinus fontSize='12px' color={theme.colors.cyan[100]}/>
                            ) : (
                              <FaPlus fontSize='12px' color={theme.colors.cyan[100]} />
                            )}
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} color={'white'} width={'26vw'}>
                        Quan C is ideal for intermediate and advanced developers who already have a solid coding foundation and want to
                        deep-dive into secure coding principles.
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                </Stack>
                <Stack>
                  <AccordionItem
                    backgroundColor={theme.colors.blue[700]} 
                    pt={6} pb={6} 
                    border={`1px solid ${theme.colors.cyan[100]}`} 
                    borderRadius={24}
                    width={'26vw'}
                  >
                    {({ isExpanded }) => (
                      <>
                        <h2>
                          <AccordionButton>
                            <Box as='span' me={8} flex='1' textAlign='left' color={theme.colors.cyan[100]}>
                            Is Quan C Free to Use ?
                            </Box>
                            {isExpanded ? (
                              <FaMinus fontSize='12px' color={theme.colors.cyan[100]}/>
                            ) : (
                              <FaPlus fontSize='12px' color={theme.colors.cyan[100]} />
                            )}
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} color={'white'} width={'26vw'}>
                        Absolutely! Quan C is completely free to use. We believe secure coding knowledge should be accessible to all developers.
              Explore the platform at your own pace and unlock your full secure coding potential.
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                </Stack>
              </Flex>
            </Accordion>
          </Stack>
        </Stack>
      </Stack>

      {/* Content 4 */}
      <Stack mt={8} pb={96} mb={36}>
        <Flex color={'white'} justify={'space-between'}>
          <Stack width={'30vw'} p={16} ms={52}>
            <Heading fontWeight={100} fontSize={'48px'}>
              Developers <br />
              Together Strong
            </Heading>
            <Text mt={4}>
            Join Our Community in Discord to learn and gather
            knowledges with other developers
            </Text>
            <Link href='https://www.google.com'>
              <Button
              backgroundColor={theme.colors.blue[700]}
              border={`1px solid ${theme.colors.cyan[100]}`}
              color={theme.colors.cyan[100]}
              mt={16}
              _hover={{
                backgroundColor: theme.colors.cyan[100],
                color: "black",
              }}
              >
                <Box me={2}>
                  <FaDiscord />
                </Box>
                Join our Discord
              </Button>
            </Link>
          </Stack >
          <Stack p={16} ms={48} width={'40vw'} bgGradient={`linear(to-b, ${theme.colors.blue[500]}, ${theme.colors.blue[300]})`} textAlign={'left'}>
            <Heading fontWeight={100} fontSize={'48px'}>
              Secure the <br />
              Code Now
            </Heading>
            <Text mt={4}>
              Start practicing your skills now in a fun <br />
              and interactive way with Quan C
            </Text>
            <Link href='https://www.google.com'>
              <Button
              backgroundColor={theme.colors.blue[700]}
              border={`1px solid ${theme.colors.cyan[100]}`}
              color={theme.colors.cyan[100]}
              mt={16}
              _hover={{
                backgroundColor: theme.colors.cyan[100],
                color: "black",
              }}
              >
                <Box me={2}>
                  <FaGithub />
                </Box>
                Join with Github
              </Button>
            </Link>
          </Stack>
          <Stack>
          </Stack>
        </Flex>
      </Stack>
    </Stack>
  )
}

export default Landing