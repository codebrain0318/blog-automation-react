/**********************************************************************************************************************
 ***********  This is login page ( usename, password )
 *********************************************************************************************************************/

import {
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    TextField,
    Button,
    Grow
} from '@mui/material';
import {
    VisibilityOff,
    Visibility,
    AccountCircle,
    Lock,
} from '@mui/icons-material';

import React from "react";

import { GlobalContext } from '../../components/GlobalContext';
import { useNavigate } from 'react-router';

const Login = () => {
    const globalProps = React.useContext(GlobalContext);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [isSubmitted, setSubmitted] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleLogin = async () => {
        setSubmitted(true);
        if (globalProps) {
            const isLogged = await globalProps.login(username, password);
            if (isLogged) {
                navigate("/");
            } else {
                setErrorMessage("Invalid username and password")
                setTimeout(()=>{
                    setErrorMessage("")
                }, 3000)
            }
        }
    }

    React.useEffect(() => {
        if (globalProps && globalProps.user?.password) {
            navigate("/");
        }
    }, [globalProps])

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: "70px",
            left: 0,
            width: "100%",
            height: "100%"
        }}>
            <Grow in={true} timeout={1000} style={{ transitionDelay: "100ms" }}>
                <Box sx={{
                    border: "1px solid lightgray",
                    borderRadius: "20px",
                    marginBottom: "70px"
                }}>
                    <Box textAlign={"center"} mt={6} mb={3} mx={2}>
                        <h1>Log in</h1>
                        <TextField
                            error={isSubmitted && username.length === 0}
                            sx={{ width: "300px" }}
                            id="login-username  "
                            label="Username"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Box>
                    <Box textAlign={"center"} mb={2} mx={2}>
                        <FormControl
                            error={isSubmitted && password.length === 0}
                            sx={{ m: 1, width: '300px' }} variant="outlined">
                            <InputLabel htmlFor="login-outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="login-outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                    </Box>
                    {
                        (errorMessage.length > 0) && <Box textAlign={"center"} mb={1} color={"red"}>
                            {errorMessage}
                        </Box>
                    }
                    <Box textAlign={"center"} mb={4} mx={3}>
                        <Button
                            disabled={username.length === 0 || password.length === 0}
                            onClick={handleLogin}
                            variant="contained" size='large' fullWidth={true}>Log in</Button>
                    </Box>
                </Box>
            </Grow>
        </Box>
    )
}

export default React.memo(Login);