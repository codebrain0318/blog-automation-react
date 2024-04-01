import React from 'react';
import {
  Typography,
  Grid
} from '@mui/material';
function PageHeader() {
  
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h1" component="h1" gutterBottom>
          Logging
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
