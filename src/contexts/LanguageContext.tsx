import { FC, useState, createContext, useContext, useEffect } from 'react';
import { LanguageType } from 'src/models/language';
import { getAllLanguageService, createLanguageService, deleteLanguageService, updateLanguageService } from 'src/services/Language';
import { LoadingContext } from './LoadingContext';
import { UserContext } from './UserContext';

type LanguageContext = {
    languages: LanguageType[],
    loadLanguage: () => void,
    addLanguage: (LanguageType) => void,
    removeLanguage: (string) => void,
    editLanguage: (string, LanguageType) => void,
    removeBulkLanguage: (array) => void
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LanguageContext = createContext<LanguageContext>(
    {} as LanguageContext
);

export const LanguageProvider: FC = ({ children }) => {
    const [languages, setLanguages] = useState<LanguageType[]>([]);
    const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);

    const loadLanguage = async () => {
        try {
            startLoading("Loading Languages...")
            const responseData = await getAllLanguageService();
            stopLoading();
            if (responseData) {
                setLanguages(responseData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addLanguage = async (language: LanguageType) => {
        try {
            startLoading("Adding A Language...")
            const responseData = await createLanguageService(language);
            stopLoading();
            if (responseData) {
                setLanguages([
                    ...languages,
                    responseData
                ])
            }
        } catch (error) {
            console.log(error);

        }
    }

    const removeLanguage = async (id: string) => {
        try {
            startLoading("Deleting A Language...")
            const responseData = await deleteLanguageService(id);
            stopLoading();
            if (responseData) {
                setLanguages(languages.filter(
                    language => (language.id !== id)
                ))
            }
        } catch (error) {

            console.log(error);
        }
    }

    const editLanguage = async (_language: LanguageType) => {
        try {
            startLoading("Updating A Language...")
            const responseData = await updateLanguageService(_language);
            stopLoading();
            if (responseData) {
                setLanguages(languages.map(
                    language => {
                        if (language.id === _language.id) return _language;
                        return language;
                    }
                ))
            }
        } catch (error) {

            console.log(error);
        }
    }

    const removeBulkLanguage = async (ids: string[]) => {
        try {
            startLoading("Deleting A Language...")
            let deletedIds = [];
            for (let i = 0; i < ids.length; i++) {
                const response = await deleteLanguageService(ids[i]);
                if (response)
                    deletedIds.push(ids[i]);
            }
            stopLoading();
            if (deletedIds.length) {
                setLanguages(languages.filter(
                    language => (!deletedIds.find(id => (id === language.id)))
                ))
            }
        } catch (error) {

            console.log(error);
        }
    }
    return (
        <LanguageContext.Provider
            value={{
                languages, loadLanguage, addLanguage, editLanguage, removeLanguage,
                removeBulkLanguage
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};
