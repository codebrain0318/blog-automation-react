import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import {Stack, Box } from '@mui/material';

import LoggingTable from './LoggingTable';

function ApplicationsTransactions() {
  return (
    <>
      <Helmet>
        <title>Blog automation</title>
      </Helmet>
      <Stack spacing={4} padding={4} marginTop={5}>
        <Box height={55}>
          <PageHeader />
        </Box>
        <Box>
          <LoggingTable />
        </Box>
      </Stack>
    </>
  );
}

export default ApplicationsTransactions;
