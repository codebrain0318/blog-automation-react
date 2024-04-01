import { ChangeEvent, useState, useContext } from 'react';
import {
  Box,
  Card,
  Table,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  styled
} from '@mui/material';

import { LoggingContext } from 'src/contexts/LoggingContext';
import { LogType } from 'src/models/log';
import moment from 'moment';


const TableCellItem = styled(TableCell)(
  ({ theme }) => `
        color: ${theme.colors.secondary.main};
`
);

const applyPagination = (
  logs: LogType[],
  page: number,
  limit: number
): LogType[] => {
  return logs.slice(page * limit, page * limit + limit);
};

function timeAgo(fromDate, toDate) {
  const difference = toDate - fromDate;
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years}y ago`;
  } else if (months > 0) {
    return `${months}m ago`;
  } else if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return `${seconds}s ago`;
  }
}

const LoggingTable = () => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const { logs } = useContext(LoggingContext);
  
  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedLogs = applyPagination(
    logs,
    page,
    limit
  );
  
  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='left' width={"200px"}>Time</TableCell>
              <TableCell align='left'>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLogs.map((log: any, index: number) => {
              
              return (
                <TableRow
                  hover
                  key={index}
                >
                  <TableCellItem>
                    <Typography
                      variant="body2"
                      gutterBottom
                      noWrap
                    >
                      {moment(log.time).format('YYYY-MM-DD HH:mm:ss')}
                    </Typography>
                  </TableCellItem>
                  <TableCellItem >
                    <Typography
                      variant="body2"
                      gutterBottom
                      noWrap
                    >
                      {log.message}
                    </Typography>
                  </TableCellItem>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <Stack direction="row-reverse">
          <TablePagination
            component="div"
            count={logs.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Stack>
      </Box>
    </Card>
  );
};

export default LoggingTable;
