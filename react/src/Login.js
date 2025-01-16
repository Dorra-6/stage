import * as React from 'react'
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { BrowserRouter, Route, Routes } from 'react-router';
import Signin from './Signin';
import SignUpLink from './SignUpLink';


function CustomEmailField() {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Email"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="inherit" />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
    />
  );
}

function CustomPasswordField() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

function CustomButton() {
  return (
    <div  style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
      style={{width :100 ,height:50 }}
    >
      Log In
    </Button>
    </div>
  );
}

  
function ForgotPasswordLink() {
  return (
    <Link href="/" variant="body2" style={{position :'absolute',left:710}}>
      Forgot password?
    </Link>
  );
}

function Title() {
  return <h1 style={{ marginBottom: 8 , textAlign: 'center'}}>Login</h1>;
}


function Login() {
  return (
    <div>
        <Title />
        <CustomEmailField />
        <CustomPasswordField />
        <CustomButton />
        <ForgotPasswordLink />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUpLink />} />
            <Route path="/Signin" element={<Signin />} />
          </Routes>
        </BrowserRouter> 
    
        
        
        
        
    </div>
  )
}

export default Login