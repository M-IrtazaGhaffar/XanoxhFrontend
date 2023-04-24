import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const n = useNavigate()
  return (
    <Box>
        Dashboard
        <Button onClick={()=>n('/dashboard/')}>
            create
        </Button>
    </Box>
  )
}

export default Dashboard