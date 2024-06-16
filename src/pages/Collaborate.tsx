import { Box, Heading, Link, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import theme from '../theme';
import ReactMarkdown from 'react-markdown';
import { Prose } from '@nikolovlazar/chakra-ui-prose';

const Collaborate = () => {
  const [guidelines, setGuidelines] = useState('');

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/Guidelines.md`)
      .then(response => response.text())
      .then(data => setGuidelines(data))
      .catch(error => console.error('Error fetching the file:', error));
  }, []);

  return (
    <Stack mt={36}>
      <Stack mb={96} pb={36}>
        <Stack ms={56}>
            <Box me={36} p={12} mt={8} color={'white'} backgroundColor={theme.colors.blue[400]} borderRadius={24}>
            <Prose>
              <ReactMarkdown>
                {guidelines}
              </ReactMarkdown>
            </Prose>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Collaborate;
