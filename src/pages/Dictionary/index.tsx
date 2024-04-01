import React from 'react';
import { Box, Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { DictionaryType, getInitialDictionary } from '../../config/Types';
import {
    getAllDictionaryService,
    createDictionaryService,
    getDictionaryByIdService,
    updateDictionaryService,
    deleteDictionaryService
} from '../../services/Dictionary';

const Dictionary = () => {
    const [dictionaries, setDictionaries] = React.useState<DictionaryType[]>([]);
    const [formData, setFormData] = React.useState<DictionaryType>(getInitialDictionary());
    const [isEdit, setIsEdit] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const loadData = async () => {
            const result = await getAllDictionaryService();
            if (result) {
                setDictionaries(result);
            }
        }
        loadData();
    }, [])

    const handleDeleteOne = async (id: number) => {
        try {
            const response = await deleteDictionaryService(id);
            if (response) {
                setDictionaries(dictionaries.filter(dictionary => (dictionary.id !== id)));
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = () => {
        setOpen(!open);
    }

    const handleAdd = () => {
        setIsEdit(false);
        setFormData(getInitialDictionary());
        setOpen(true);
    }

    const handleEdit = async (id: number) => {
        setIsEdit(true);
        const dictionary = await getDictionaryByIdService(id);
        if (dictionary) {
            setFormData(dictionary);
            setOpen(true);
        }
    }

    const handleAddEditSubmit = async () => {
        try {
            let newDictionary;
            if (isEdit) {
                newDictionary = await updateDictionaryService(formData);
                if (newDictionary) {
                    setDictionaries(dictionaries.map(dictionary => {
                        if (dictionary.id === formData.id) {
                            return formData;
                        }
                        return dictionary;
                    }))
                }
            } else {
                newDictionary = await createDictionaryService(formData);
                if (newDictionary) {
                    setDictionaries([
                        ...dictionaries,
                        {
                            ...newDictionary
                        }
                    ]);
                    setFormData(getInitialDictionary());
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button onClick={handleAdd}>Add</Button>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Language</TableCell>
                            <TableCell align="right">Bad Entry</TableCell>
                            <TableCell align="right">Right Entry</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dictionaries.map((row, index) => (
                            <TableRow key={row.language + index}>
                                <TableCell component="th" scope="row">
                                    {row.language}
                                </TableCell>
                                <TableCell align="right">{row.badEntry}</TableCell>
                                <TableCell align="right">{row.rightEntry}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleDeleteOne(row.id)}>Delete</Button>
                                    <Button onClick={() => handleEdit(row.id)}>Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    width: 400,
                    backgroundColor: "#fff",
                    border: '2px solid #000',
                    padding: "2rem",
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <h2 id="simple-modal-title">Add Dictionary</h2>
                    <form>
                        <TextField
                            label="Language"
                            name="language"
                            value={formData.language}
                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Bad Entry"
                            name="bad_entry"
                            value={formData.badEntry}
                            onChange={(e) => setFormData({ ...formData, badEntry: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Right Entry"
                            name="right_entry"
                            value={formData.rightEntry}
                            onChange={(e) => setFormData({ ...formData, rightEntry: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" onClick={handleAddEditSubmit}>
                            {!isEdit ? "Add" : "Update"}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default Dictionary;