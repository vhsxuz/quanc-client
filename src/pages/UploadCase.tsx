import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react'
import React, { useRef, useState, ChangeEvent, DragEvent, useEffect } from 'react'
import theme from '../theme'
import { FaTrashAlt } from 'react-icons/fa'
import { GoFileZip } from "react-icons/go";
import { IoCloudUploadOutline } from 'react-icons/io5'
import axios from 'axios';

const UploadCase: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [points, setPoints] = useState('');
  const [totalTestCase, setTotalTestCase] = useState('');
  const [tags, setTags] = useState([
    { label: 'Tag 1', value: ''},
  ]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState("");
  const accessToken = localStorage.getItem('accessToken');

  const dropZoneRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddTags = () => {
    setTags([...tags, { label: `Tag ${tags.length + 1}`, value: ''}]);
  };

  const handleDeleteTags = (index: number) => {
    const newInputs = [...tags];
    newInputs.splice(index, 1);
    setTags(newInputs);
  };

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (file: File) => {
    const validFormats = ['zip'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const isValidFormat = fileExtension && validFormats.includes(fileExtension);
    const isValidSize = file.size <= 30 * 1024 * 1024;

    if (isValidFormat && isValidSize) {
      setUploadedFile(file);
      setErrorMessage(null);
    } else {
      setUploadedFile(null);
      setErrorMessage('Invalid file format or size. Please upload a valid ZIP file not exceeding 30 MB.');
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

  const handleSubmit = (file: File) => {
    setError("");
    const data = new FormData();

    data.append('title', title);
    data.append('link', link);
    data.append('points', points);
    data.append('total_test_case', totalTestCase);
    tags.map(tag => {
      data.append('tags', tag.value);
    })
    data.append('file', file);

    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/submitChallenge',
      headers: { 
        'Authorization': `Bearer ${accessToken}`, 
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      const data = response.data;
      setIsUploaded(true)
      console.log(JSON.stringify(data));
    })
    .catch((error) => {
      console.log(error.response.data);
      const errorMessage = error.response.data.message
      setError(errorMessage)
    });

  };

  return (
    <Stack>
      <Stack mt={24} mb={96} pb={36} ml={64}>
        <Heading color={'white'} fontSize={'6xl'}>
          Upload Case
        </Heading>

      <FormControl color={'white'} mt={8}>
          <Stack me={72} mb={8}>
            <FormLabel fontSize={'xl'}>
              Case Title
            </FormLabel>    
            <Input placeholder='Case Title' onChange={(e) => setTitle(e.target.value)} />
          </Stack>

          <Stack me={72} mb={8}>
            <FormLabel fontSize={'xl'}>
              Case URL
            </FormLabel>    
            <Input placeholder='Case Url' onChange={(e) => setLink(e.target.value)} />
          </Stack>

          <Stack me={72} mb={8}>
            <FormLabel fontSize={'xl'}>
              Points
            </FormLabel>
            <Input placeholder='Points' onChange={(e) => setPoints(e.target.value)} />
          </Stack>

          <Stack me={72} mb={8}>
            <FormLabel fontSize={'xl'}>
              Total Test Case
            </FormLabel>
            <Input placeholder='Total Test Case' onChange={(e) => setTotalTestCase(e.target.value)} />
          </Stack>

          <Stack me={72} mb={8}>
            <FormLabel fontSize={'xl'}>
              Tags
            </FormLabel>
            {tags.map((input, index) => (
              <Flex>
                <Input 
                  me={2} 
                  id={input.label}
                  value={input.value}
                  placeholder={`Tag ${index + 1}`}
                  onChange={(e) => {
                    const newInputs = [...tags];
                    newInputs[index].value = e.target.value;
                    setTags(newInputs);
                  }}
  
                />
                <Button backgroundColor={'red'} onClick={() => handleDeleteTags(index)}>
                  <Box color={'white'}>
                    <FaTrashAlt />
                  </Box>
                </Button>
              </Flex>
            ))}
            <Button bgColor={theme.colors.blue[200]} color={'white'} _hover={{opacity: 0.7}} onClick={() => handleAddTags()}>
              Add Tag
            </Button>
          </Stack>

        <FormLabel fontSize={'xl'}>
          Case Folder
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
          mr={72}
          _hover={{
            opacity: 0.7
          }}
          onClick={handleUploadClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
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
                  <GoFileZip />
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
                    Upload Your Case Here
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
                  ZIP File Max 30MB
                </Box>
              </Stack>
            }
          </Box>
        </Box>
        {errorMessage && (
          <Text color="red" textAlign="center" mt={4} me={72}>
            {errorMessage}
          </Text>
        )}

        <Button 
          type='submit'
          mt={4} 
          bgColor={theme.colors.blue[200]} 
          color={'white'}
          _hover={{
            opacity: 0.7
          }}
          onClick={() => {
            if (uploadedFile) {
              handleSubmit(uploadedFile);
            } else {
              console.error('No file uploaded');
            }
          }}
          >
          Submit
        </Button>
      </FormControl>
      {
        isUploaded && error === "" ? 
        <Stack>
          <Text color={'white'}>
            Case Uploaded
          </Text>
        </Stack>
        : 
        <Stack>
        <Text color={'red'}>
          { error }
        </Text>
        </Stack>
      }
      </Stack>
    </Stack>
  )
}

export default UploadCase