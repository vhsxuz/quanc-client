import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Stack, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormLabel, Input, Spacer, Spinner } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import theme from '../theme';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaCopy, FaFileCode, FaTrashAlt } from 'react-icons/fa';
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from 'axios';

type ChallengeDetailProps = {
  id: string;
  link: string;
};

const ChallengeDetail: React.FC<ChallengeDetailProps> = ({ id }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [challengeText, setChallengeText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submissionId, setSubmissionId] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passedTestCase, setPassedTestCase] = useState<number[]>([]);
  const searchParams = new URLSearchParams(window.location.search);
  const repoLink = searchParams.get('link');
  const challengeId = searchParams.get('id');
  const totalTestCase: number = parseInt(searchParams.get('total_test_case') ?? '0', 10);
  const testCaseArray: number[] = Array.from({ length: totalTestCase }, (_, index) => index);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const accessToken = localStorage.getItem('accessToken');

  const navigateToViewLog = (submissionId: string) => {
    navigate(`/view-log?submission_id=${submissionId}`) 
  }


  async function fetchReadmeFromGitHub() {
    try {
      const response = await fetch(`https://raw.githubusercontent.com/${repoLink}/main/README.md`);
      if (response.ok) {
        const readmeText = await response.text();
        setChallengeText(readmeText);
      } else {
        console.error('Failed to fetch README');
      }
    } catch (error) {
      console.error('Error fetching README:', error);
    }
  }

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
      setUserId(data.data.app_data.user_id)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchReadmeFromGitHub();
    getUserData();
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

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (file: File) => {
    const validFormats = ['js', 'py', 'php', 'java'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const isValidFormat = fileExtension && validFormats.includes(fileExtension);
    const isValidSize = file.size <= 3 * 1024 * 1024;

    if (isValidFormat && isValidSize) {
      setUploadedFile(file);
      setErrorMessage(null);
    } else {
      setUploadedFile(null);
      setErrorMessage('Invalid file format or size. Please upload a valid JS, PY, PHP, or JAVA file not exceeding 3MB.');
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleSubmitAnswer = (file: File) => {
    setIsChecking(true);
    setIsLoading(true);
    const data = new FormData();
    const blobFile: Blob = new Blob([file], {type: file.type})

    data.append('userId', userId);
    data.append('challengeId', challengeId ?? "");
    data.append('file', blobFile);
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/submitAnswer',
      headers: { 
        'Authorization': `Bearer ${accessToken}`, 
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      const data = response.data
      console.log(data)
      setSubmissionId(data.data.submission_id);
      setIsSuccess(data.data.status)
      setPassedTestCase(data.data.passed_test_case)
      setIsLoading(false)
    })
    .catch((error) => {
      console.log(error);
    });
    
  }

  useEffect(() => {
    const dropZone = dropZoneRef.current;
    if (dropZone) {
      dropZone.addEventListener('drop', handleDrop as EventListener);
      dropZone.addEventListener('dragover', handleDragOver as EventListener);
    }

    return () => {
      if (dropZone) {
        dropZone.removeEventListener('drop', handleDrop as EventListener);
        dropZone.removeEventListener('dragover', handleDragOver as EventListener);
      }
    };
  }, []);

  return (
    <Stack mt={36}>
      <Stack mb={96} pb={56}>
        <Stack ms={72} me={72}>
          <Text color='white' fontSize={'xl'}>
            Clone the Project Here {id}
          </Text>
          <Box p={4} backgroundColor={theme.colors.blue[700]} border={'1px solid white'} borderRadius={8}>
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
                  navigator.clipboard.writeText(`git clone https://github.com/${repoLink}.git`);
                  setIsOpen(true);
                }}
              >
                <Box color={'white'} me={2}>
                  <FaCopy />
                </Box>
                Copy
              </Button>
            </Stack>
          </Box>
        </Stack>

        <Box ms={72} me={72} p={12} mt={8} color={'white'} backgroundColor={theme.colors.blue[400]} borderRadius={24}>
          <Prose>
            <ReactMarkdown>
              {challengeText}
            </ReactMarkdown>
          </Prose>
        </Box>

        <FormLabel 
          htmlFor="answer" 
          color={'white'}
          ms={72}
          mt={16}
          fontSize={'3xl'}
        >
          Submit Your Answer
        </FormLabel>
        <Box
          ref={dropZoneRef}
          mt={2}
          p={16}
          borderRadius={24}
          textAlign="center"
          cursor="pointer"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          backgroundColor={theme.colors.blue[400]}
          ms={72} 
          me={72}
          _hover={{
            opacity: 0.7
          }}
          onClick={handleUploadClick}
        >
          <Box>
            {uploadedFile ?
              <Stack 
                p={8} 
                mt={4} 
                borderRadius={12} 
                alignItems="center"
                border={'1px solid white'}
                position="relative"
                ms={72} 
                me={72} 
              >
                <Button 
                  backgroundColor={'red'} 
                  fontSize={'xl'} 
                  color={'white'} 
                  onClick={handleDeleteFile}
                  _hover={{ backgroundColor: 'darkred' }}
                  position="absolute"
                  top="8px"
                  right="8px"
                >
                  <FaTrashAlt />
                </Button>
                <Box fontSize={'6xl'} color={'white'} ms={4} mt={2}>
                  <FaFileCode />
                </Box>
                <Text color="white" mt={2}>
                  Uploaded File: {uploadedFile.name}
                </Text>
                <Text color="white">
                  ({(uploadedFile.size / 1024).toFixed(2)} KB)
                </Text>
              </Stack>
            :
              <Stack>
                <Box 
                  color={'white'}
                  fontSize={'6xl'}
                  ms={20}
                >
                  <IoCloudUploadOutline />
                </Box>
                <FormLabel 
                  htmlFor="file-upload"
                  textAlign={'center'}
                  mt={2}
                >
                  <Text color={'white'}>
                    Upload Your Answer Here
                  </Text>
                  <Input 
                    ref={inputRef}
                    type="file" 
                    multiple={false}
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                  />
                </FormLabel>
                <Box fontSize="s" color="white" textAlign={'center'}>
                  JS, PY, PHP, or JAVA Max 3MB
                </Box>
              </Stack>
            }
          </Box>
        </Box>
        {errorMessage && (
          <Text color="red" textAlign="center" mt={4}>
            {errorMessage}
          </Text>
        )}

        <Stack ms={72} me={72}>
          <Button
            color={'white'}
            backgroundColor={theme.colors.blue[300]}
            _hover={{ opacity: 0.7 }}
            borderRadius={10}
            pt={6}
            pb={6}
            fontSize={'lg'}
            onClick={() => {
              if (uploadedFile) {
                handleSubmitAnswer(uploadedFile);
              } else {
                console.error('No file uploaded');
              }
            }}
          >
            Submit Answer
          </Button>
        </Stack>

        {
          isChecking ? 
            <Stack ms={72} me={72} backgroundColor={theme.colors.blue[500]} borderRadius={16} p={16} mt={8} border={'1px solid white'}>
              { isLoading ? 
              <Box textAlign={'center'}>
                <Spinner size={'xl'} color='white'/> 
              </Box>
                : 
              <Box color={'white'} alignItems={'start'}>
                { testCaseArray.map((testCase) => (
                  <Text key={testCase} mt={2}>
                    TestCase {testCase + 1}: {passedTestCase.includes(testCase + 1) ? '✅' : '❌'}
                  </Text>
                ))}
              </Box>
              }

              { isSuccess && !isLoading === true ?
                <Text color={theme.colors.green[100]} mt={8} >
                  Congratulations, you solved the case!
                </Text>
                :
                !isLoading ?
                <Stack>
                  <Text color={'red'} mt={8}>
                    Good Attempt, dont give up!
                  </Text>
                  <Stack ms={72} me={72}>
                    <Button
                      color={'white'}
                      backgroundColor={theme.colors.blue[300]}
                      _hover={{ opacity: 0.7 }}
                      borderRadius={10}
                      pt={6}
                      pb={6}
                      fontSize={'lg'}
                      onClick={() => {
                        if (submissionId !== '') {
                          navigateToViewLog(submissionId);
                        } else {
                          console.error('No Submission Id');
                        }
                      }}
                    >
                      View Log
                    </Button>
                  </Stack>
                </Stack>
                :
                <></>
              }
            </Stack>
            :
            <></>
        }
      </Stack>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent backgroundColor={theme.colors.blue[200]} color={'white'}>
          <ModalHeader>Text Copied!</ModalHeader>
          <ModalBody>
            The text has been copied to your clipboard.
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default ChallengeDetail;