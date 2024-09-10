import { Box, Button, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';

type LogProps = {
  success: string;
  message: string;
  data: string;
};

const ViewLog = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const submissionId = searchParams.get('submission_id');
  const [log, setLog] = useState<LogProps | null>(null);
  const accessToken = localStorage.getItem('accessToken');

  const navigateBack = () => {
    navigate(-1);
  };

  const getLog = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8000/getSubmissionLog/${submissionId}`,
      headers: { 
        'Authorization': `Bearer ${accessToken}`
      }
    };

    axios.request(config)
    .then((response) => {
      const data = response.data;
      setLog(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    getLog();
  }, []);

  return (
    <Stack mt={36}>
      <Stack mb={96} pb={36}>
        <Stack ms={72} me={72} backgroundColor={theme.colors.blue[500]} borderRadius={16} p={16} mt={8} border={'1px solid white'}>
          <Box color={'white'} overflow="auto" p={4}>
            {log && (
              <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowWrap: 'break-word', color: 'white' }}>
                {log.data
                  .replace(/^"|"$/g, '')
                  .replace(/\\n/g, '<br />')
                }
              </pre>
            )}
          </Box>
        </Stack>
        <Box ms={72} mt={4}>
          <Button 
            backgroundColor={'red'} 
            color={'white'}
            onClick={navigateBack}
            _hover={{
              opacity: 0.7
            }}
          >
            Back to Challenge
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ViewLog;
