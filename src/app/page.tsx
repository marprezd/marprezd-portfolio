import { Box, Container, Typography } from '@mui/material'

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '90%', p: 2, marginX: 'auto', display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ textAlign: 'center' }} variant="h1">This website is under construction</Typography>
      </Box>
    </Container>
  )
}
