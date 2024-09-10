import { Button, Divider, Flex, Heading, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import theme from '../theme';
import { useNavigate } from 'react-router-dom';

type Submission = {
  challengeId: string,
  repoLink: string,
  challengeTitle: string,
  status: boolean,
  passedTestCaseValue: number,
  passedTestCaseCount: number,
  totalTestCase: number,
  challengePoints: number,
}

const History = () => {

  const [submissionHistory, setSubmissionHistory] = useState([]);
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();

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
      console.log(data.data.app_data.submissions_history)
      setPoints(data.data.app_data.total_points)
      setSubmissionHistory(data.data.app_data.submissions_history)
    } catch (error) {
      console.error(error);
    }
  }

  const navigateToChallengeDetail = (id: string, link: string, total_test_case: number) => {
    const urlParts = link.split('/');
    const repoName = urlParts.slice(-2).join('/');
    navigate(`/challenge-detail?id=${id}&link=${encodeURIComponent(repoName)}&total_test_case=${total_test_case}`);
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Stack m={56} position={'relative'} minHeight={'120vh'}>
      <Flex mb={8} justify={'space-between'}>
        <Heading color={'white'}>
          Submission History
        </Heading>

        <Text align={'center'} color={'white'} pt={4}>
          Total Points: {points}
        </Text>
      </Flex>
      <Divider orientation='horizontal' color={'white'} mb={8} />
      <TableContainer>
        <Table variant={'simple'}>
          <Thead>
            <Tr>
              <Th color={'white'}>Challenge Title</Th>
              <Th color={'white'}>Status</Th>
              <Th color={'white'}>Passed Test Case</Th>
              <Th color={'white'}>Case Detail</Th>
            </Tr>
          </Thead>
          <Tbody>
            {submissionHistory && submissionHistory.map((history: Submission) =>(
              <Tr>
                <Td color={'white'}>{history.challengeTitle}</Td>
                <Td color={history.status === true ? "green" : "red"}>{history.status === true ? "Passed" : "Failed"}</Td>
                <Td color={history.status === true ? "green" : "red"}>{history.passedTestCaseCount}/{history.totalTestCase}</Td>
                <Td color={'white'}>
                  <Button 
                    onClick={() => {navigateToChallengeDetail(history.challengeId, history.repoLink, history.totalTestCase)}}
                    backgroundColor={theme.colors.blue[100]}>
                      Challenge
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default History