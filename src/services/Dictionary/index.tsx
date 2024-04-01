import config from "../../config/Global";
import { DictionaryType as Dictionary } from '../../config/Types';

export const getAllDictionaryService = async () => {
    try {
        const url = `${config.baseUrl}/dictionary/`;

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export const createDictionaryService = async (dictionary: Dictionary) => {
    try {
        const url = `${config.baseUrl}/dictionary/`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dictionary)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export const getDictionaryByIdService = async (id: number) => {
    try {
        const url = `${config.baseUrl}/dictionary/${id}`;

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export const updateDictionaryService = async (dictionary: Dictionary) => {
    try {
        const url = `${config.baseUrl}/dictionary/${dictionary.id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dictionary)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export const deleteDictionaryService = async (id: number) => {
    try {
        const url = `${config.baseUrl}/dictionary/${id}`;
        const response = await fetch(url, { method: 'DELETE' });

        if (response.ok) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}