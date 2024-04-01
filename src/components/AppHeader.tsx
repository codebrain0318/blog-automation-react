/**********************************************************************************************************************
 ***********  This component is used for header
 *********************************************************************************************************************/

import { Box, Stack, } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';

// import logo from "../assets/images/table.png";
// import avatar from "../assets/images/avatar.png";

const AppHeader = () => {
    const globalProps = React.useContext(GlobalContext);
    const navigate = useNavigate();
    const handleGoToLanguage = () => {
        navigate("/language");
    }

    const handleGoToDictionary = () => {
        navigate("/dictionary")
    }

    const handleGoTo = (url: string) => {
        navigate(url);
    }

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "70px",
            backgroundColor: "lightblue",
            padding: "0 2rem"
        }}>

            <Stack direction={"row"} spacing={3} sx={{
                cursor: "pointer"
            }}>
                {
                    globalProps?.user && <>
                        <p
                            onClick={() => handleGoTo("/")}
                        >Go to Blogs</p>
                        <p
                            onClick={handleGoToLanguage}
                        >Go to Language</p>
                        <p
                            onClick={handleGoToDictionary}
                        >Go to Dictionary</p>
                    </>
                }
            </Stack>
            {
                !globalProps?.user &&
                <p
                    onClick={() => handleGoTo("/login")}
                >
                    Login
                </p>
            }
        </Box>
    )
}

export default React.memo(AppHeader);