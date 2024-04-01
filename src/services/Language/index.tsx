import config from "../../config/Global";
import { LanguageType } from '../../config/Types';

export const getAllLanguageService = async () => {
    try {
        const url = `${config.baseUrl}/language/`;

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

export const createLanguageService = async (language: LanguageType) => {
    try {
        const url = `${config.baseUrl}/language/`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(language)
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

export const getLanguageByIdService = async (id: number) => {
    try {
        const url = `${config.baseUrl}/language/${id}`;

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

export const updateLanguageService = async (language: LanguageType) => {
    try {
        const url = `${config.baseUrl}/language/${language.id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(language)
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

export const deleteLanguageService = async (id: number) => {
    try {
        const url = `${ config.baseUrl }/language/${ id }`; 
        const response = await fetch(url, { method: 'DELETE' });

        if (response.ok) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}