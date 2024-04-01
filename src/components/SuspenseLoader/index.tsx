import { FC, useEffect } from 'react';
import NProgress from 'nprogress';
import { Box, CircularProgress, Typography } from '@mui/material';

const SuspenseLoader: FC<{message: string}> = ({message}) => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        background: "rgba(252,252,252,0.8)",
        zIndex: 1000
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Box><CircularProgress size={72} disableShrink thickness={3} /></Box>
      <Typography variant='h2' color='primary'>
        {message}
      </Typography>
    </Box>
  );
}

export default SuspenseLoader;
