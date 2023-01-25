import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <Stack>
        <Skeleton height={`50`} />
    </Stack>
  )
}

export default Loader