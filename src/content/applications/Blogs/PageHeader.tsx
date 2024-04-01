import { Typography, Grid } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Search } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { BlogContext } from 'src/contexts/BlogContext';

function PageHeader() {
  
  const { updateSearch } = useContext(BlogContext);
  const [_search, setSearch] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Handle the enter key event here
      updateSearch(_search);
    }
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h2" component="h2" gutterBottom>
          Content Listing
        </Typography>
      </Grid>
      <Grid item>
        <OutlinedInput
          sx={{
            "& fieldset": { border: 'none' },
            background: "white"
          }}
          id="outlined-adornment-amount1"
          startAdornment={<InputAdornment position="start"><Search color='primary' /></InputAdornment>}
          placeholder='Search here'
          value={_search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {/* <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Search Input
        </Button> */}
      </Grid>
    </Grid>
  );
}

export default PageHeader;
