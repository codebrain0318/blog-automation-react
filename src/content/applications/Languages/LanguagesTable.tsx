import { FC, ChangeEvent, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  Table,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Button,
  Typography,
  useTheme,
  styled
} from '@mui/material';

import BulkActions from './BulkActions';
import { LanguageNameCode, LanguageType } from 'src/models/language';
import { LanguageContext } from 'src/contexts/LanguageContext';
import { Dialog, OutlinedInput } from '@mui/material';
import FlagItem from 'src/components/Flag';

// interface RecentOrdersTableProps {
//   className?: string;
//   languages: LanguageType[];
// }

function SimpleDialog(props) {
  const { onClose, open, editLanguage, language } = props;
  const [lang, setLang] = useState("")
  const [url, setUrl] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    setLang(language?.name);
    setUrl(language?.url);
    setUsername(language?.username);
    setPassword(language?.password);
  }, [language])

  const handleClose = () => {
    onClose("");
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleUpdateLanguage = async () => {
    handleClose();
    await editLanguage(
      {
        id: language.id,
        name: lang,
        url: url,
        username: username,
        password: password
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
            Edit Language
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
              id="outlined-adornment-amount6"
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
              id="outlined-adornment-amount7"
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
              id="outlined-adornment-amount8"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>
          <Box paddingTop={"33px"}>
            <Button
              onClick={handleUpdateLanguage}
              sx={{ width: "200px" }}
              variant='contained'
              color='primary'>Update</Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  language: PropTypes.any.isRequired,
  editLanguage: PropTypes.func.isRequired
};

const TableCellItem = styled(TableCell)(
  ({ theme }) => `
        color: ${theme.colors.secondary.main};
`
);

const applyPagination = (
  languages: LanguageType[],
  page: number,
  limit: number
): LanguageType[] => {
  return languages.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable = () => {
  const [selectedLanguageTypes, setSelectedLanguageTypes] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedLanguageTypes.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const { languages, loadLanguage, removeLanguage, editLanguage } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [editingLanguage, setEditingLanguage] = useState({})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }
  };

  const handleSelectAllLanguageTypes = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedLanguageTypes(
      event.target.checked
        ? languages.map((language) => language.id)
        : []
    );
  };

  const handleSelectOneLanguageType = (
    event: ChangeEvent<HTMLInputElement>,
    languageId: string
  ): void => {
    if (!selectedLanguageTypes.includes(languageId)) {
      setSelectedLanguageTypes((prevSelected) => [
        ...prevSelected,
        languageId
      ]);
    } else {
      setSelectedLanguageTypes((prevSelected) =>
        prevSelected.filter((id) => id !== languageId)
      );
    }
  };

  const handleEditLanguage = (lang: LanguageType) => {
    setEditingLanguage(lang);
    handleClickOpen();
  }

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedLanguageTypes = applyPagination(
    languages,
    page,
    limit
  );
  const selectedSomeLanguageTypes =
    selectedLanguageTypes.length > 0 &&
    selectedLanguageTypes.length < languages.length;
  const selectedAllLanguageTypes =
    selectedLanguageTypes.length === languages.length;
  const theme = useTheme();

  return (
    <Card>
      {/* {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <Box flex={1} p={2}>
          Recent Orders
        </Box>
      )}
      <Divider /> */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllLanguageTypes}
                  indeterminate={selectedSomeLanguageTypes}
                  onChange={handleSelectAllLanguageTypes}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Username</TableCell>
              <TableCell align="right">Password</TableCell>
              <TableCell align="right" sx={{ paddingRight: "45px" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLanguageTypes.map((language) => {
              const isLanguageTypeSelected = selectedLanguageTypes.includes(
                language.id
              );
              return (
                <TableRow
                  hover
                  key={language.id}
                  selected={isLanguageTypeSelected}
                >
                  <TableCellItem padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isLanguageTypeSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneLanguageType(event, language.id)
                      }
                      value={isLanguageTypeSelected}
                    />
                  </TableCellItem>
                  <TableCellItem>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                      <FlagItem language={language.name} />
                    </Stack>
                  </TableCellItem>
                  <TableCellItem>
                    <Typography
                      variant="body2"
                      gutterBottom
                      noWrap
                    >
                      {language.url}
                    </Typography>
                  </TableCellItem>
                  <TableCellItem>
                    <Typography
                      variant="body2"
                      gutterBottom
                      noWrap
                    >
                      {language.username}
                    </Typography>
                  </TableCellItem>
                  <TableCellItem align="right">
                    <Typography
                      variant="body2"
                      gutterBottom
                      noWrap
                    >
                      {language.password.slice(0,3)}
                      {"*".repeat(Math.max(language.password.length-3,0))}
                    </Typography>
                  </TableCellItem>
                  <TableCellItem align="right">
                    <FormControl sx={{
                      width: "100px"
                    }}>
                      <InputLabel id="demo-simple-select-label"></InputLabel>
                      <Select
                        size='small'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={10}
                        sx={{
                          textAlign: "left",
                          "& fieldset": { border: 'none' },
                        }}
                      >
                        <MenuItem
                          onClick={() => removeLanguage(language.id)}
                          value={10}>
                          Delete
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleEditLanguage(language)}
                          value={20}>
                          Edit
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </TableCellItem>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <Stack direction="row" justifyContent={"space-between"}>
          <Box>
            {selectedBulkActions && (
              <BulkActions selected={selectedLanguageTypes} setSelected={setSelectedLanguageTypes} />
            )}
          </Box>
          <TablePagination
            component="div"
            count={languages.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Stack>
      </Box>

      <SimpleDialog
        open={open}
        onClose={handleClose}
        editLanguage={editLanguage}
        language={editingLanguage}
      />
    </Card>
  );
};

// RecentOrdersTable.propTypes = {
//   languages: PropTypes.array.isRequired
// };

// RecentOrdersTable.defaultProps = {
//   languages: []
// };

export default RecentOrdersTable;
