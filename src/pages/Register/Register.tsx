/**********************************************************************************************************************
 ***********  This is the register page ( username, password, confirm )
 *********************************************************************************************************************/

import React from 'react';
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
    Lock
} from '@mui/icons-material';
import { registerService } from '../../services/Auth/Auth';
import { GlobalContext } from '../../components/GlobalContext';
import { useNavigate } from 'react-router';

const Register = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirm, setConfirm] = React.useState("");

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);
    const [isSubmitted, setSubmitted] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState("");

    const globalProps = React.useContext(GlobalContext);
    const navigate = useNavigate();

    React.useEffect(()=>{
        if ( globalProps && globalProps.user?.password ) {
            navigate("/");
        }
    }, [globalProps])

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirm = () => setShowConfirm((show) => !show);

    const handleRegister = async () => {
        setSubmitted(true)
        const response = await registerService(username, password);
        if ( response ) {
            navigate("/login")
        } else {
            setErrorMessage("Invalid information")
            setTimeout(()=>{
                setErrorMessage("")
            }, 3000);
        }
    }

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
                        <h1>Register</h1>
                        <TextField
                            error={isSubmitted && username === ""}
                            sx={{ width: "300px" }}
                            id="register-username  "
                            label="Username"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                    </Box>
                    <Box textAlign={"center"} mb={2} mx={2}>
                        <FormControl
                            error={ isSubmitted && password===""}
                            sx={{ m: 1, width: '300px' }} variant="outlined">
                            <InputLabel htmlFor="register-outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="register-outlined-adornment-password"
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
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </FormControl>
                    </Box>
                    <Box textAlign={"center"} mb={2} mx={2}>
                        <FormControl
                            error={(isSubmitted && confirm==="") || password !== confirm}
                            sx={{ m: 1, width: '300px' }} variant="outlined">
                            <InputLabel htmlFor="register-outlined-adornment-confirm">Confirm</InputLabel>
                            <OutlinedInput
                                id="register-outlined-adornment-confirm"
                                type={showConfirm ? 'text' : 'password'}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirm}
                                            edge="end"
                                        >
                                            {showConfirm ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                value={confirm}
                                onChange={e=>setConfirm(e.target.value)}
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
                        disabled={username.length === 0 || password.length === 0 || confirm.length === 0 }
                        onClick={handleRegister}
                        variant="contained" size='large' fullWidth={true}>Register</Button>
                    </Box>
                </Box>
            </Grow>
        </Box>
    )
}

export default React.memo(Register);