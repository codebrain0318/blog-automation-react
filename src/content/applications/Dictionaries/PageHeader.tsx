import React from 'react';
import {
  Typography,
  Button,
  Grid,
  Dialog,
  Box,
  Stack,
  OutlinedInput,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import PropTypes from 'prop-types';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useState, useContext } from 'react';
import { DictionaryContext } from 'src/contexts/DictionaryContext';
import { LanguageNameCode } from 'src/models/language';
import FlagItem from 'src/components/Flag';

const emails = ["ABCDE", "DEFGH"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [language, setLanguage] = useState(LanguageNameCode[0].lang)
  const [badEntry, setBadEntry] = useState("")
  const [rightEntry, setRightEntry] = useState("")
  const { addDictionary } = useContext(DictionaryContext);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleAddDictionary = () => {
    onClose("")
    addDictionary({
      language: language,
      badEntry: badEntry,
      rightEntry: rightEntry
    })
  }

  return (
    <Dialog
      onClose={handleClose} open={open}>
      <Box
        sx={{
          "width": "369px",
          "height": "425px",
          "background": "linear-gradient(139deg, #0E8A74 23.19%, #26C58B 104.35%)",
          "position": "relative",
          "overflow": "hidden"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "255.429px",
            height: "427.169px",
            top: "-100px",
            right: "-100px",
            flexShrink: 0,
            borderRadius: "100%",
            background: "rgba(205, 255, 242, 0.10)"
          }}
        ></Box>
        <Box sx={{
          position: "absolute",
          top: "33px",
          left: "30px"
        }}
        ><img src="/static/images/languages/wave.png" width={"35px"} /></Box>
        <Box sx={{
          position: "absolute",
          bottom: "30px",
          right: "27px"
        }}
        ><img src="/static/images/languages/vector2.png" width={"35px"} /></Box>
        <Box sx={{
          position: "absolute",
          top: "35px",
          left: "120px"
        }}>
          <Typography fontFamily={"Poppins"} fontWeight={"500"} fontSize={"17px"} color={"white"}>
            Add Dictionary
          </Typography>
        </Box>
        <Box padding={"40px"} paddingTop={"100px"} textAlign={"center"}>
          <Stack direction={"column"} spacing={2}>
            {/* <OutlinedInput fullWidth
              sx={{
                "& fieldset": { border: 'none' },
                background: "white",
                padding: "5px"
              }}
              id="outlined-adornment-amount"
              placeholder='Language'
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            /> */}
            <FormControl>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{
                  "& fieldset": { border: 'none' },
                  background: "white",
                  padding: "5px",
                  textAlign: "left"
                }}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {
                  LanguageNameCode.map(lang => {
                    return (
                      <MenuItem
                      key={"123" + lang.lang}
                        value={lang.lang}>
                          <FlagItem language={lang.lang} />
                      </MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
            <OutlinedInput fullWidth
              sx={{
                "& fieldset": { border: 'none' },
                background: "white",
                padding: "5px"
              }}
              id="outlined-adornment-amount4"
              placeholder='Bad Entry'
              value={badEntry}
              onChange={(e) => setBadEntry(e.target.value)}
            />
            <OutlinedInput fullWidth
              sx={{
                "& fieldset": { border: 'none' },
                background: "white",
                padding: "5px"
              }}
              id="outlined-adornment-amount5"
              placeholder='Right Entry'
              value={rightEntry}
              onChange={(e) => setRightEntry(e.target.value)}
            />
          </Stack>
          <Box paddingTop={"33px"}>
            <Button
              onClick={handleAddDictionary}
              sx={{ width: "200px" }}
              variant='contained'
              color='primary'>
              Add
            </Button>
          </Box>
        </Box>
      </Box>
      {/* <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem
            button
            onClick={() => handleListItemClick(email)}
            key={email}
          >
            <ListItemAvatar>
              <PersonPinCircleOutlined />
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick('addAccount')}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcCallOutlined />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List> */}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};


function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h1" component="h1" gutterBottom>
          Dictionary
        </Typography>
      </Grid>
      <Grid item>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Add Dictionary
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
