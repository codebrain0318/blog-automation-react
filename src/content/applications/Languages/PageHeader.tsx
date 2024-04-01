import React from 'react';
import {
  Typography, Button, Grid, Dialog,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  OutlinedInput,
  Stack
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { LanguageContext } from 'src/contexts/LanguageContext';
import { LanguageNameCode } from 'src/models/language';
import FlagItem from 'src/components/Flag';

const emails = ["ABCDE", "DEFGH"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, addLanguage } = props;
  const [lang, setLang] = useState(LanguageNameCode[0].lang)
  const [url, setUrl] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleAddLanguage = async () => {
    handleClose();
    await addLanguage({
      name: lang,
      url,
      username,
      password
    })
  }

  return (
    <Dialog
      onClose={handleClose} open={open}>
      <Box
        sx={{
          "width": "369px",
          "height": "510px",
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
            Add Language
          </Typography>
        </Box>
        <Box padding={"40px"} paddingTop={"100px"} textAlign={"center"}>
          <Stack direction={"column"} spacing={2}>
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
                value={lang}
                onChange={(e) => setLang(e.target.value)}
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
              id="outlined-adornment-amount9"
              placeholder='URL'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <OutlinedInput fullWidth
              sx={{
                "& fieldset": { border: 'none' },
                background: "white",
                padding: "5px"
              }}
              id="outlined-adornment-amount10"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <OutlinedInput fullWidth
              sx={{
                "& fieldset": { border: 'none' },
                background: "white",
                padding: "5px"
              }}
              id="outlined-adornment-amount11"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>
          <Box paddingTop={"33px"}>
            <Button
              onClick={handleAddLanguage}
              sx={{ width: "200px" }}
              variant='contained'
              color='primary'>Add</Button>
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
  selectedValue: PropTypes.string.isRequired,
  addLanguage: PropTypes.func.isRequired
};

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  const { addLanguage } = useContext(LanguageContext);

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
          Languages
        </Typography>
      </Grid>
      <Grid item>
        <Box>
          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            addLanguage={addLanguage}
          />
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={handleClickOpen}
          >
            Add Language
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
