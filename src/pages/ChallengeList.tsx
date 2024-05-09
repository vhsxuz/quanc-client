import { Box, Button, Divider, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import theme from '../theme'

const ChallengeList = () => {
  return (
    <Stack mt={56} ms={56} position={'relative'} minHeight={'100vh'}>
      <Stack>
        <Heading fontSize={'xxx-large'} fontWeight={400} color={'white'}>
          Challenge List
        </Heading>
        <Box pe={64} mb={8}>
          <Divider orientation='horizontal' color={'white'} />
        </Box>

        {/* LOOP THIS IN THE FUTURE */}
        <Stack>
          <Stack border={'1px solid white'} borderRadius={4} p={4} me={64}>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Box>
              <Heading fontSize={'x-large'} fontWeight={400} color={'white'}>
                Challenge Name
              </Heading>
              <Text color={theme.colors.blue[100]} mt={2}>
                Category
              </Text>
              </Box>
              <Box>
                <Button backgroundColor={theme.colors.blue[200]} color={'white'} me={8}>
                  Challenge
                </Button>
              </Box>
            </Flex>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ChallengeList