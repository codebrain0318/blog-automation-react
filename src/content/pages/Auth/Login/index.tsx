import { useEffect, useState, useContext } from 'react';
import {
    Box,
    Typography,
    OutlinedInput,
    IconButton,
    InputAdornment,
    Button,
    Grid,
    useTheme,
    Stack
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Logo from 'src/components/LogoSign';

import { styled } from '@mui/material/styles';
import { Person, Visibility, VisibilityOff, VpnKey } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { UserContext } from 'src/contexts/UserContext';

const TypographyH1 = styled(Typography)(
    ({ theme }) => `
  font-size: ${theme.typography.pxToRem(75)};
`
);

const TypographyH3 = styled(Typography)(
    ({ theme }) => `
  color: ${theme.colors.alpha.black[50]};
`
);
function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const theme = useTheme();
    const navigate = useNavigate();
    const [_username, setUsername] = useState("");
    const [_password, setPassword] = useState("");
    const { username, login } = useContext(UserContext);

    useEffect(() => {
        if (username) {
            navigate("/management/blogs");
        }
    }, [username])

    const handleLogin = () => {
        login({
            username: _username,
            password: _password
        })
    }
    return (
        <>
            <Helmet>
                <title>Blog automation</title>
            </Helmet>
            <Grid container>
                <Grid item md={5} sx={{display: {md: "block", sm: "none", xs: "none"}}}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                        <Logo />
                        <Typography variant='h1' color={theme.colors.primary.light} paddingBottom={20} textAlign={"center"}>
                            WELCOME TO <br />AUTOMATION OF SINGLEQUIVER
                        </Typography>
                    </Box>
                </Grid>
                <Grid item md={7} sm={12}>
                    <Box sx={{ background: theme.colors.alpha.black["5"] }} display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                        <Stack spacing={2} width={500} maxWidth={"90%"}>
                            <OutlinedInput
                                fullWidth
                                sx={{
                                    "& fieldset": { border: 'none' },
                                    background: "white"
                                }}
                                id="outlined-adornment-amount12"
                                startAdornment={<InputAdornment position="start"><Person color='primary' /></InputAdornment>}
                                placeholder='Username'
                                value={_username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                fullWidth
                                sx={{
                                    "& fieldset": { border: 'none' },
                                    background: "white"
                                }}
                                id="outlined-adornment-amount13"
                                startAdornment={<InputAdornment position="start"><VpnKey color='primary' /></InputAdornment>}
                                placeholder='Password'
                                value={_password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button fullWidth variant='contained'
                                onClick={handleLogin}
                            >LOGIN</Button>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Login;
