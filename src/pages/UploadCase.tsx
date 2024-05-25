import { Heading, Link, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import theme from '../theme'

const UploadCase = () => {
  return (
    <Stack mt={36}>
      <Stack mb={96} pb={96}>
        <Stack ms={56}>
          <Heading color={theme.colors.cyan[100]} fontSize={'6xl'}>
            Case Upload Guidelines
          </Heading>

          <Text color={'white'} mt={4}>
            Step by step on publish your custom case through our email 
          </Text>

          <Text color={'white'}>
            {"Join us on "}
            <Link href="https://discord.com/invite/5ZUsk7q5vq">
               Discord 
              </Link>
            {" if you have any questions"}
          </Text>
        </Stack>
      </Stack>

    </Stack>
  )
}

export default UploadCase