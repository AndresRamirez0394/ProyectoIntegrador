import React from 'react'
import { Button } from '@mui/base'
import { Link } from 'react-router-dom'

export default function userNameButton({user}) {
  return (
    <div>
      <Button as={Link} to={'/profile?matricula='+user?.matricula+''} colorScheme="teal" size="xs" ml="auto">
        {user?.matricula}
        </Button>
    </div>
  )
}
