import { Box, Button, Divider, Flex, Heading, Stack, Text, Spinner, Radio, RadioGroup, Checkbox, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import axios from 'axios';
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
  PaginationSeparator,
} from "@ajna/pagination";
import { FaCheck, FaSearch } from 'react-icons/fa';

type Tag = {
  map(arg0: (tag: Tag) => import("react/jsx-runtime").JSX.Element): React.ReactNode;
  tag_id: string;
  tag_name: string;
};

type Challenge = {
  status: string;
  challenge_id: string;
  challenge_title: string;
  created_at: Date;
  points: number;
  repo_link: string;
  total_test_case: number;
  tags: Tag;
};



const ChallengeList = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [value, setValue] = useState("incomplete");
  const [difficulty, setDifficulty] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState(0);

  const {
    currentPage,
    setCurrentPage,
    pagesCount,
    pages
  } = usePagination({
    pagesCount: totalPage,
    limits: {
      outer: 2,
      inner: 1,
    },
    initialState: { currentPage: 1 },
  });

  const getAllChallenges = async (page: number) => {
    const accessToken = localStorage.getItem('accessToken');

    const data = JSON.stringify({
      "filter": value,
      "search": searchQuery,
      "difficulty": difficulty,
      "page": page,
    });
    
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/getChallenges',
      headers: { 
        'Authorization': `Bearer ${accessToken}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    try {
      const response = await axios.request(config);
      let data = response.data;
      setChallenges(data.data);
      data.data.forEach((data: { status: string; }) => {
        data.status = value;
      });
      console.log(data.data);
      setTotalPage(data.paginationData.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (nextPage: number): void => {
    setCurrentPage(nextPage);
  };

  const navigateToChallengeDetail = (id: string, link: string) => {
    navigate(`/challenge-detail/${id}?link=${encodeURIComponent(link)}`);
  }

  const handleChange = (nextValue: string): void => {
    setValue(nextValue);
    setCurrentPage(1);
    setIsLoading(true);
  };

  const handleDifficultyChange = (nextValue: string): void => {
    setDifficulty(nextValue);
    setCurrentPage(1);
    setIsLoading(true);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (): void => {
    setCurrentPage(1);
    setIsLoading(true);
    getAllChallenges(currentPage);
  };

  useEffect(() => {
    getAllChallenges(currentPage);
  }, [currentPage, value, difficulty]);
  
  return (
    <Stack mt={56} position={'relative'} minHeight={`${100 + (challenges.length * 5)}vh`}>
      <Stack direction={'row'} spacing={0}>
        <Stack width={'90%'} ps={36}>
          <Flex justifyContent={'space-between'}>
            <Heading fontSize={'xxx-large'} fontWeight={400} color={'white'}>
              Challenge List
            </Heading>
            
            <Box pe={64} mb={8} mt={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaSearch color="white" />
                </InputLeftElement>
                <Input 
                  type="text" 
                  placeholder="Search" 
                  color={'white'}
                  value={searchQuery} 
                  onChange={handleSearchChange} 
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleSearchSubmit();
                    }
                  }}
                />
              </InputGroup>
            </Box>
          </Flex>

          <Box pe={64} mb={8} mt={4}>
            <Divider orientation='horizontal' color={'white'} />
          </Box>
          {isLoading ? (
            <Spinner size={'xl'} color={'white'} />
          ) : (
            <>
              {challenges && challenges.map((challenge: Challenge) => (
                <Stack key={challenge.challenge_id}>
                  <Stack border={`1px solid ${theme.colors.blue[500]}`} borderRadius={16} p={4} me={64} mt={4} backgroundColor={theme.colors.blue[400]}>
                    <Flex justifyContent={'space-between'} alignItems={'center'}>
                      <Box>
                        <Heading fontSize={'x-large'} fontWeight={400} color={'white'} mb={2}>
                          {challenge.challenge_title}
                        </Heading>
                        <Stack direction={'row'}>
                          <Text 
                            color={'white'} 
                            backgroundColor={
                              (challenge.points >= 0 && challenge.points <= 15) ? 
                                `green` : 
                              (challenge.points >= 16 && challenge.points <= 25) ? 
                                `orange` : 
                                `red`
                              }
                              mt={2} pb={0.5} 
                              ps={2} 
                              pe={2} 
                              borderRadius={8}>
                              {
                              (challenge.points >= 0 && challenge.points <= 15) 
                                ? 
                                `Easy` : 
                                (challenge.points >= 16 && challenge.points <= 25) ? 
                                `Medium` : 
                                `Hard`
                              }
                            </Text>
                          {challenge.tags.map((tag: Tag) => (
                            <Text key={tag.tag_id} color={'white'} backgroundColor={theme.colors.blue[200]} mt={2} pb={0.5} ps={2} pe={2} borderRadius={8}>
                              {tag.tag_name}
                            </Text>
                          ))}
                        </Stack>
                      </Box>
                      <Box>
                        <Button 
                        backgroundColor= { challenge.status === 'incomplete' ?
                          theme.colors.blue[700] :
                          theme.colors.cyan[100]
                        } 
                        color= { challenge.status === 'incomplete' ?
                        theme.colors.cyan[100] :
                        theme.colors.blue[700]
                      } 
                        border={`1px solid ${theme.colors.cyan[100]}`} 
                        me={8}
                        _hover={{
                          backgroundColor: theme.colors.cyan[100],
                          color: theme.colors.blue[700],
                          opacity: challenge.status === 'incomplete' ? 1 : 0.7
                        }}
                        onClick={() => {navigateToChallengeDetail(challenge.challenge_id, challenge.repo_link)}}
                        >

                          {challenge.status === 'incomplete' ? 
                          'Challenge' : 
                          <>
                            Solved 
                            <Box ms={2}>
                              <FaCheck />
                            </Box>
                          </>
                          }
                        </Button>
                      </Box>
                    </Flex>
                  </Stack>
                </Stack>
              ))}
            </>
          )}
          <Stack mt={4} alignItems={'center'} me={56} mb={96} pb={36}>
            <Pagination
              pagesCount={pagesCount}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            >
              <PaginationContainer>
                <PaginationPrevious
                  backgroundColor={theme.colors.blue[200]}
                  color={'white'}
                  _hover={{
                    backgroundColor: theme.colors.blue[100],
                    color: theme.colors.blue[700],
                  }}>
                  <Box>
                    <FaChevronLeft />
                  </Box>
                </PaginationPrevious>
                <PaginationPageGroup 
                ms={2} 
                me={2}
                separator={
                  <PaginationSeparator
                    backgroundColor={theme.colors.blue[100]}
                    color={'white'}
                    fontSize="sm"
                    ps={4}
                    pe={4}
                  />
                }
                >
                  {pages.map((page: number) => (
                    <PaginationPage 
                      key={`pagination_page_${page}`} 
                      page={page}
                      ps={4}
                      pe={4}
                      ms={1}
                      me={1}
                      backgroundColor={theme.colors.blue[200]}
                      color={'white'}
                      _hover={{
                        backgroundColor: theme.colors.blue[100],
                        color: theme.colors.blue[700],
                      }}
                    />
                  ))}
                </PaginationPageGroup>
                <PaginationNext
                  backgroundColor={theme.colors.blue[200]}
                  color={'white'}
                  _hover={{
                    backgroundColor: theme.colors.blue[100],
                    color: theme.colors.blue[700],
                  }}>
                  <Box>
                    <FaChevronRight />
                  </Box>
                </PaginationNext>
              </PaginationContainer>
            </Pagination>
          </Stack>
        </Stack>
        
        <Stack width={'15%'} color={'white'} me={36}>
          <Text>
            STATUS
          </Text>
          <RadioGroup 
            onChange={handleChange} 
            value={value}
          >
            <Stack>
              <Radio value='incomplete' _checked={{ bg: theme.colors.cyan[100], color: 'white' }}>Incomplete</Radio>
              <Radio value='completed' _checked={{ bg: theme.colors.cyan[100], color: 'white' }}>Completed</Radio>
            </Stack>
          </RadioGroup>

          <Divider  mt={8} mb={8} />

          <Text>
            DIFFICULTY
          </Text>
          <RadioGroup 
            onChange={handleDifficultyChange} 
            value={difficulty}
          >
            <Stack>
              <Radio value='' _checked={{ bg: theme.colors.cyan[100], color: 'white' }}>All</Radio>
              <Radio value='easy' _checked={{ bg: theme.colors.cyan[100], color: 'white' }}>Easy</Radio>
              <Radio value='medium' _checked={{ bg: theme.colors.cyan[100], color: 'white' }}>Medium</Radio>
              <Radio value='hard' _checked={{ bg: theme.colors.cyan[100], color: 'white' }}>Hard</Radio>
            </Stack>
          </RadioGroup>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ChallengeList;