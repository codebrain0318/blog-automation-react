import { FC, useState, createContext, useContext } from 'react';
import { LoadingContext } from './LoadingContext';
import { DictionaryType } from 'src/models/dictionary';
import { createDictionaryService, deleteDictionaryService, getAllDictionaryService, updateDictionaryService } from 'src/services/Dictionary';

type DictionaryContext = {
    dictionaries: DictionaryType[],
    loadDictionary: () => void,
    addDictionary: (DictionaryType) => void,
    removeDictionary: (string) => void,
    editDictionary: (DictionaryType) => void,
    removeBulkDictionary: (array) => void
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const DictionaryContext = createContext<DictionaryContext>(
    {} as DictionaryContext
);

export const DictionaryProvider: FC = ({ children }) => {
    const [dictionaries, setDictionaries] = useState<DictionaryType[]>([]);
    const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);

    const loadDictionary = async () => {
        try {
            startLoading("Loading Dictionaries...")
            const responseData = await getAllDictionaryService();
            stopLoading();
            if (responseData) {
                setDictionaries(responseData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addDictionary = async (dictionary: DictionaryType) => {
        try {
            startLoading("Adding A Dictionary...")
            const responseData = await createDictionaryService(dictionary);
            stopLoading();
            if (responseData) {
                setDictionaries([
                    ...dictionaries,
                    responseData
                ])
            }
        } catch (error) {

            console.log(error);
        }
    }

    const removeDictionary = async (id: string) => {
        try {
            startLoading("Deleting A Dictionary...")
            const responseData = await deleteDictionaryService(id);
            stopLoading();
            if (responseData) {
                setDictionaries(dictionaries.filter(
                    dictionary => (dictionary.id !== id)
                ))
            }
        } catch (error) {

            console.log(error);
        }
    }

    const editDictionary = async (_dictionary: DictionaryType) => {
        try {
            startLoading("Updating A Dictionary...")
            const responseData = await updateDictionaryService(_dictionary);
            stopLoading();
            if (responseData) {
                setDictionaries(dictionaries.map(
                    dictionary => {
                        if (dictionary.id === _dictionary.id) return _dictionary;
                        return dictionary;
                    }
                ))
            }
        } catch (error) {

            console.log(error);
        }
    }

    const removeBulkDictionary = async (ids: string[]) => {
        try {
            startLoading("Deleting A Dictionary...")
            let deletedIds = [];
            for (let i = 0; i < ids.length; i++) {
                const response = await deleteDictionaryService(ids[i]);
                if (response)
                    deletedIds.push(ids[i]);
            }
            stopLoading();
            if (deletedIds.length) {
                setDictionaries(dictionaries.filter(
                    dictionary => (!deletedIds.find(id => (id === dictionary.id)))
                ))
            }
        } catch (error) {

            console.log(error);
        }
    }
    return (
        <DictionaryContext.Provider
            value={{
                dictionaries, loadDictionary, addDictionary, editDictionary, removeDictionary,
                removeBulkDictionary
            }}
        >
            {children}
        </DictionaryContext.Provider>
    );
};
