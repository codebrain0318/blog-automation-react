/**********************************************************************************************************************
 ***********  This component is spinner used while loading
 *********************************************************************************************************************/

import React from 'react';
import { Box, LinearProgress } from '@mui/material';
import { GlobalContext } from '../GlobalContext';

const Spinner = () => {
    const globalProps = React.useContext(GlobalContext);
    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1005,
        }}>

            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 1006,
            }}>
                <LinearProgress />
            </Box>
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1007,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "xx-large",
                fontWeight: "900"
            }}>
                {globalProps?.spinnerMessage}
            </Box>
        </Box>
    )
}

export default Spinner;