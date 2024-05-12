import { Box, Button, Divider, Flex, Heading, Stack, Text, Spinner } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import theme from '../theme'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Challenge = {
  challenge_id: string;
  challenge_title: string;
  created_at: Date;
  points: number;
  repo_link: string;
  total_test_case: number;
};

const ChallengeList = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  var accessToken = localStorage.getItem('accessToken');

  
  const getAllChallenges = useCallback( async () => {
    accessToken = localStorage.getItem('accessToken')
    const response = await axios.get('http://localhost:8000/getChallenges', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}` 
      }
    });

    const data = await response.data;
    setChallenges(data.data)
    setCount(data.data.length)
    setIsLoading(false);
  }, [])

  useEffect(() => {
    getAllChallenges();
  }, [getAllChallenges])
  
  return (
    <Stack mt={56} ms={56} position={'relative'} minHeight={`${100+ (count * 5)}vh`}>
      <Stack>
        <Heading fontSize={'xxx-large'} fontWeight={400} color={'white'}>
          Challenge List
        </Heading>
        <Box pe={64} mb={8} mt={4}>
          <Divider orientation='horizontal' color={'white'} />
        </Box>

        { !challenges || challenges.length === 0 ? (
          <Spinner size={'xl'} color={'white'} />
          
        ) : (
          <>
            { challenges && challenges.map((challenge: Challenge) => (
              <Stack key={challenge.challenge_id}>
                <Stack border={`1px solid ${theme.colors.blue[500]}`} borderRadius={16} p={4} me={64} mt={4} backgroundColor={theme.colors.blue[400]}>
                  <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <Box>
                    <Heading fontSize={'x-large'} fontWeight={400} color={'white'}>
                      {challenge.challenge_title} {/* use the destructured variable `title` here */}
                    </Heading>
                    <Text color={theme.colors.blue[100]} mt={2}>
                      Category
                    </Text>
                    </Box>
                    <Box>
                      <Button backgroundColor={theme.colors.blue[700]} color={theme.colors.cyan[100]} border={`1px solid ${theme.colors.cyan[100]}`} me={8}>
                        Challenge
                      </Button>
                    </Box>
                  </Flex>
                </Stack>
              </Stack>
            ))}
          </>
        )}
      </Stack>
    </Stack>
  )
}

export default ChallengeList