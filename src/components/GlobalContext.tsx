import React, { ReactNode } from 'react';
import { getAllBlogsService } from '../services/Blog';
import { BlogGeneralType, LanguageType } from '../config/Types';
import { getAllLanguageService } from '../services/Language';

type UserType = {
    username: string,
    password: string
}

type GlobalPropsType = {
    blogs: BlogsType | null,
    user: UserType | null,
    login: (username: string, password: string) => Promise<boolean>,
    load: (page: number, pageCount: number, search: string, column: string) => Promise<void>,
    languages: LanguageType[],
    setLanguages: React.Dispatch<React.SetStateAction<LanguageType[]>>
    spinnerMessage: string,
    setSpinnerMessage: React.Dispatch<React.SetStateAction<string>>
}
    
type BlogsType = {
    blogs: BlogGeneralType[],
    count: number
}

export const GlobalContext = React.createContext<GlobalPropsType | null>(null);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [blogs, setBlogs] = React.useState<BlogsType | null>(null)
    const [user, setUser] = React.useState<UserType | null>(null);

    const [languages, setLanguages] = React.useState<LanguageType[]>([]);
    const [spinnerMessage, setSpinnerMessage] = React.useState("");
 
    const login = async (username: string, password: string) => {
        const response = await getAllBlogsService(username, password);
        if (response) {
            setBlogs({
                blogs: response.blogs,
                count: response.count
            });
            setUser({
                username: username,
                password: password
            });
            const response2 = await getAllLanguageService();
            if ( response2 )
                setLanguages(response2)
            return true;
        }
        return false;
    }

    const load = async (page: number = 1, pageCount: number = 5, search: string = "", column: string = "post_title") => {
        const response = await getAllBlogsService(user!.username, user!.password, page, pageCount, search, column);
        if (response) {
            setBlogs(response);
        }
    }

    const globalProps = {
        blogs: blogs,
        user: user,
        login: login,
        load: load,
        languages: languages,
        setLanguages: setLanguages,
        spinnerMessage: spinnerMessage,
        setSpinnerMessage: setSpinnerMessage
    }

    return (
        <GlobalContext.Provider value={globalProps}>
            {children}
        </GlobalContext.Provider>
    )
}