import './Loginpage.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../asset/image/logo1_cropped.png';
import axios from 'axios';
import NavBar from '../../components/NavBar/NavBar';
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/user";
import CSRFToken from '../../csrftoken';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const theme = createTheme();

export default function SignIn(props: { email: string; pw: string; }) {
  const userState = {
    email: props.email,
    pw: props.pw
  }
  const reduxUserState = useSelector(selectUser);
  userState.email = reduxUserState.email;
  userState.pw = reduxUserState.pw;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await axios.post("api/user/signin/", {
      "email": data.get('email'),
      "password": data.get('password')
    });
    if(response.status !== 204){
      console.log(response.data);
    }
  };

  return (
    <div>
    <NavBar></NavBar>
    <CSRFToken></CSRFToken>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={logo} alt="logo" className='logo' />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={userState.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={userState.pw}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}

SignIn.defaultProps = {
  email: '',
  pw: ''
}