import React, { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Outlet, useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import { UserContext } from 'src/contexts/UserContext';

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const { username } = React.useContext(UserContext);
  const navigate = useNavigate();

  React.useEffect(()=>{
    if ( !username ) navigate("/auth/login");
  }, [username])

  return (
    <Box
      sx={{
        flex: 1,
        height: '100%'
      }}
    >
      {children || <Outlet />}
    </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
