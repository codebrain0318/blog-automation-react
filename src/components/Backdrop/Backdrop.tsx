/**********************************************************************************************************************
 ***********  This component handles close event in the background  
 *********************************************************************************************************************/


import { Box } from '@mui/material';
import React from 'react';

const Backdrop: React.FC<{handleClose: ()=>void}> = (props) => {
    return (
        <Box sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0)",
            zIndex: 1000
        }}
        onClick={props.handleClose}
        >

        </Box>
    )
}

export default Backdrop;