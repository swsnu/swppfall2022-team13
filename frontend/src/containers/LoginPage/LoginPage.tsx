import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import CSRFToken from '../../csrftoken';
import { selectUser } from "../../store/slices/user";
import './Loginpage.css';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const reduxUserState = useSelector(selectUser);
  const [emailState, setEmailState] = React.useState("");
  const [pwState, setPwState] = React.useState("");

  React.useEffect(() => {
    setEmailState(reduxUserState.email);
    setPwState(reduxUserState.pw);
  }, [])
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await axios.post("/api/user/signin/", {
      "email": data.get('username'),
      "password": data.get('password')
    });
    if(response.status !== 204){
      console.log(response.data);
    }
    else{
      navigate("/main/");
    }
  };

  return (
    <div>
    {/* <NavBar></NavBar> */}
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
          {/* <img src={logo} alt="logo" className='logo' /> */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="UserName"
              type="username"
              name="username"
              autoComplete="current-username"
              autoFocus
              value={emailState}
              onChange={(e) => setEmailState(e.target.value)}
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
              value={pwState}
              onChange={(e) => setPwState(e.target.value)}
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