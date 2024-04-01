import PropTypes from 'prop-types';
import { useState, useRef, useContext } from 'react';

import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { Translate } from '@mui/icons-material';
import { LoadingContext } from 'src/contexts/LoadingContext';
import { getBlogStatusService } from 'src/services/Blog';
import { BlogContext } from 'src/contexts/BlogContext';

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

function BulkActions(props) {
  const [onMenuOpen, menuOpen] = useState<boolean>(false);
  const moreRef = useRef<HTMLButtonElement | null>(null);
  const { selected } = props;
  const { startLoading } = useContext(LoadingContext);
  const { translateAll } = useContext(BlogContext);

  const openMenu = (): void => {
    menuOpen(true);
  };

  const closeMenu = (): void => {
    menuOpen(false);
  };

  const handleStartTranslate = async () => {
    translateAll(selected);
  }

  return (
    <>
      <Box display="flex" alignItems="center">
        <Typography variant="h5" color="text.secondary">
          Bulk actions:
        </Typography>
        <ButtonError
          sx={{ ml: 1 }}
          startIcon={<Translate />}
          variant="contained"
          onClick={handleStartTranslate}
        >
          Translate Selected
        </ButtonError>
      </Box>
    </>
  );
}

BulkActions.propTypes = {
  selected: PropTypes.array.isRequired
}

export default BulkActions;
