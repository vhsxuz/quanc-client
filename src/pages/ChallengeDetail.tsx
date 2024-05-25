import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { Prose } from '@nikolovlazar/chakra-ui-prose'
import theme from '../theme'
import { useLocation } from 'react-router-dom'
import { FaCopy } from 'react-icons/fa'

type ChallengeDetailProps = {
  id: string;
  link: string;
}

const ChallengeDetail: React.FC<ChallengeDetailProps> = ({ id, link }) => {
  const [challengeText, setChallengeText] = useState('');
  const location = useLocation();
  const repoLink = new URLSearchParams(location.search).get('link');
  const [isOpen, setIsOpen] = useState(false);

  async function fetchReadmeFromGitHub() {
    console.log(repoLink)
    try {
      const response = await fetch(`https://raw.githubusercontent.com/${repoLink}/main/README.md`);
      if (response.ok) {
        const readmeText = await response.text();
        console.log(readmeText)
        setChallengeText(readmeText);
      } else {
        console.error('Failed to fetch README');
      }
    } catch (error) {
      console.error('Error fetching README:', error);
    }
  }

  useEffect(() => {
    fetchReadmeFromGitHub();
  }, [id]);

  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isOpen]);

  return (
    <Stack mt={36}>
      <Stack mb={96} pb={56}>

      <Stack>
          <Text>
            Clone the Project Here
          </Text>
          <Box mt={4} p={4} backgroundColor={theme.colors.blue[700]} border={'1px solid white'} borderRadius={8} ms={72} me={72}>
            <Stack direction="row" align="center" justify="space-between">
              <Text fontSize="md" color={'white'}>
                {`git clone https://github.com/${repoLink}.git`}
              </Text>
              <Button 
              size="sm" 
              color={'white'}
              backgroundColor={theme.colors.blue[200]}
              _hover={{
                opacity: 0.7      
              }}
              onClick={() => {
                navigator.clipboard.writeText(`git clone https://github.com${repoLink}.git`);
                setIsOpen(true);
              }}>
                <Box color={'white'} me={2}>
                  <FaCopy />
                </Box>
                Copy
              </Button>
            </Stack>
          </Box>
        </Stack>

        <Stack ms={56}>
        </Stack>
        <Box ms={72} me={72} p={16} mt={8} color={'white'} backgroundColor={theme.colors.blue[400]} borderRadius={24}>
          <Prose>
            <ReactMarkdown>
              {challengeText}
            </ReactMarkdown>
          </Prose>
        </Box>
      </Stack>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent backgroundColor={theme.colors.blue[200]} color={'white'}>
          <ModalHeader>Text Copied!</ModalHeader>
          <ModalBody>
            The text has been copied to your clipboard.
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  )
}

export default ChallengeDetail