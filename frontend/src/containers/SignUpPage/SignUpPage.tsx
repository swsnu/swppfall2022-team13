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
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { userActions } from "../../store/slices/user";
import './SignUpPage.css';

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [emailWarning, setEmailWarning] = React.useState(true);

  const isEmail = () => {
    const emailRegex =
    /^\S+@\S+\.\S+$/;

    return emailRegex.test(email);
  };

  // for email validation check
  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
    const is_email: boolean = isEmail();
    if(!is_email){
      setEmailWarning(false);
    }
    else{
      setEmailWarning(true);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await axios.post("/api/user/signup/", {
      "email": data.get('email'),
      "password": data.get('password'),
      "username": data.get('username')
    })
    // when signup success
    if(response.status === 201){
      dispatch(userActions.postEmailPw({email: data.get('username').toString(), pw: data.get('password').toString()}))
      navigate('/login/');
    }
  };


  return (
    <ThemeProvider theme={theme}>
      {/* <NavBar></NavBar> */}
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleChangeEmail}
                />
                <span className='email-warning' hidden={emailWarning || email===""}>Email ????????? ?????? ??????????????????!</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!emailWarning}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}