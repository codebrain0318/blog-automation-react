import React from 'react';
import { createLanguageService, deleteLanguageService, updateLanguageService } from '../../services/Language';
import { Box, Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { LanguageType, getInitialLanguage } from '../../config/Types';
import { GlobalContext } from '../../components/GlobalContext';

const Language = () => {
    const globalProps = React.useContext(GlobalContext);
    const [formData, setFormData] = React.useState<LanguageType>(getInitialLanguage())
    const [isEdit, setIsEdit] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    // React.useEffect(() => {
    //     const loadData = async () => {
    //         const result = await getAllLanguageService();
    //         if ( result )
    //             setLanguages(result);
    //     }
    //     loadData();
    // }, [])

    const handleDeleteOne = async (id: number) => {
        try {
            const response = await deleteLanguageService(id);
            if ( response )
                globalProps?.setLanguages(globalProps.languages.filter(language => (language.id !== id)));
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleAdd = () => {
        setIsEdit(false);
        setFormData(getInitialLanguage());
        setOpen(true);
    }

    const handleEdit = (id: number) => {
        setIsEdit(true);
        setFormData(globalProps!.languages[id]);
        setOpen(true);
    }

    const handleAddEditSubmit = async () => {
        try {
            let newLanguage;
            if (isEdit) {
                newLanguage = await updateLanguageService(formData);
                if (newLanguage) {
                    globalProps!.setLanguages(globalProps!.languages.map(language => {
                        if (language.id === formData.id) {
                            return formData;
                        }
                        return language;
                    }))
                }
            } else {
                newLanguage = await createLanguageService(formData);
                if (newLanguage) {

                    globalProps!.setLanguages([
                        ...globalProps!.languages,
                        {
                            ...newLanguage
                        }
                    ])
                    setFormData(getInitialLanguage())
                }
            }
        } catch (error) {
            console.log(error)
        }
        setOpen(false);
    }

    return (
        <>

            <Button
                onClick={handleAdd}
            >Add</Button>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">URL</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Password</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {globalProps?.languages.map((row, index) => (
                            <TableRow key={row.name + index}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.url}</TableCell>
                                <TableCell align="right">{row.username}</TableCell>
                                <TableCell align="right">{row.password}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        onClick={() => handleDeleteOne(row.id)}
                                    >Delete</Button>
                                    <Button
                                        onClick={() => handleEdit(index)}
                                    >Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        width: 400,
                        backgroundColor: "#fff",
                        border: '2px solid #000',
                        padding: "2rem",
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                    <h2 id="simple-modal-title">Add Language</h2>
                    <form>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({
                                ...formData,
                                name: e.target.value
                            })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="URL"
                            name="url"
                            value={formData.url}
                            onChange={(e) => setFormData({
                                ...formData,
                                url: e.target.value
                            })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={(e) => setFormData({
                                ...formData,
                                username: e.target.value
                            })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData({
                                ...formData,
                                password: e.target.value
                            })}
                            fullWidth
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" onClick={
                            handleAddEditSubmit
                        }>
                            {
                                !isEdit ?
                                    "Add" : "Update"}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default Language;