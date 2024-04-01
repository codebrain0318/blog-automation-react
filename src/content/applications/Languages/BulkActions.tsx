import { useState, useRef, useContext } from 'react';

import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { Delete } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { LanguageContext } from 'src/contexts/LanguageContext';

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
  const {selected, setSelected} = props;
  const {removeBulkLanguage} = useContext(LanguageContext);

  const openMenu = (): void => {
    menuOpen(true);
  };

  const closeMenu = (): void => {
    menuOpen(false);
  };

  const handleDeleteSelected = async () => {
    removeBulkLanguage(selected);
    setSelected([])
  }

  return (
    <>
      <Box display="flex" alignItems="center">
        <Typography variant="h5" color="text.secondary">
          Bulk actions:
        </Typography>
        <ButtonError
          sx={{ ml: 1 }}
          startIcon={<Delete />}
          variant="contained"
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </ButtonError>
      </Box>
    </>
  );
}

BulkActions.propTypes = {
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
}

export default BulkActions;
